import { createSlice } from '@reduxjs/toolkit';
import { filter } from 'lodash';
// utils
import axios from 'axios';
import { apiUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  types: [],
  typeList: [],
  notifications: null
};

const slice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MANAGE TYPE
    getTypeListSuccess(state, action) {
      state.isLoading = false;
      state.typeList = action.payload;
    },

    // GET PROJECTS
    getTypesSuccess(state, action) {
      state.isLoading = false;
      state.types = action.payload;
    },

    // DELETE PROJECTS
    deleteType(state, action) {
      const deleteType = filter(state.typeList, (type) => type._id !== action.payload);
      state.typeList = deleteType;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteType } = slice.actions;

// ----------------------------------------------------------------------

export function getTypeList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${apiUrl}/projecttypes`, {
        withCredentials: true
      });
      dispatch(slice.actions.getTypeListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
