import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { apiUrl } from '../config';
// utils
import { decodeToken, isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          await axios.get(`${process.env.REACT_APP_HOST_API_URL}/projects`, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
              setSession(accessToken);
              const loggenInUser = decodeToken(accessToken);

              dispatch({
                type: 'INITIALIZE',
                payload: {
                  isAuthenticated: true,
                  user: {
                    ...loggenInUser,
                    photoURL: '/static/mock-images/avatars/avatar_default.jpg'
                  }
                }
              });
            }
            console.log(res)
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post(
      `${apiUrl}/auth/login`,
      {
        username,
        password
      },
      { withCredentials: true }
    );

    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
          photoURL: '/static/mock-images/avatars/avatar_default.jpg'
        }
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
    await axios.get(`${process.env.REACT_APP_HOST_API_URL}/auth/logout`, {
      withCredentials: true
    });
  };

  // const resetPassword = () => { };

  // const updateProfile = () => { };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
