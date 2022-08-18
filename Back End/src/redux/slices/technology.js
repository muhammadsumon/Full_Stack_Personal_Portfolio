import { createSlice } from '@reduxjs/toolkit';
import { filter } from 'lodash';
// utils
import axios from 'axios';
import { apiUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  technologyList: []
};

const slice = createSlice({
  name: 'technology',
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
    getTechnologyListSuccess(state, action) {
      state.isLoading = false;
      state.technologyList = action.payload;
    },

    // DELETE TECHNOLOGY
    deleteTechnology(state, action) {
      const deleteTechnology = filter(state.technologyList, (technology) => technology._id !== action.payload);
      state.technologyList = deleteTechnology;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteTechnology } = slice.actions;

// ----------------------------------------------------------------------

export function getTechnologyList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${apiUrl}/technologies`, {
        withCredentials: true
      });
      dispatch(slice.actions.getTechnologyListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
