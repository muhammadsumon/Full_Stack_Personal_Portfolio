import { createSlice } from '@reduxjs/toolkit';
import { filter } from 'lodash';
// utils
import axios from 'axios';
import { apiUrl } from '../../config';

// ------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  projectList: []
};

const slice = createSlice({
  name: 'project',
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

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET PROJECTS
    getProjectsSuccess(state, action) {
      state.isLoading = false;
      state.projects = action.payload;
    },

    // DELETE PROJECTS
    deleteProject(state, action) {
      const deleteProject = filter(state.projectList, (project) => project._id !== action.payload);
      state.projectList = deleteProject;
    },

    // GET MANAGE PROJECTS
    getProjectListSuccess(state, action) {
      state.isLoading = false;
      state.projectList = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteProject } = slice.actions;

// ----------------------------------------------------------------------

export function getProjectList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${apiUrl}/projects`, {
        withCredentials: true
      });
      dispatch(slice.actions.getProjectListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
