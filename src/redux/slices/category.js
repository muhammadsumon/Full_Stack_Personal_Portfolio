import { createSlice } from '@reduxjs/toolkit';
import { filter } from 'lodash';
// utils
import axios from 'axios';
import { apiUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  categoryList: []
};

const slice = createSlice({
  name: 'category',
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

    // GET MANAGE CATEGORY
    getCategoryListSuccess(state, action) {
      state.isLoading = false;
      state.categoryList = action.payload;
    },

    // DELETE CATEGORY
    deleteCategory(state, action) {
      const deleteCategory = filter(state.categoryList, (category) => category._id !== action.payload);
      state.categoryList = deleteCategory;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteCategory } = slice.actions;

// ----------------------------------------------------------------------

export function getCategoryList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${apiUrl}/categories`, {
        withCredentials: true
      });
      dispatch(slice.actions.getCategoryListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
