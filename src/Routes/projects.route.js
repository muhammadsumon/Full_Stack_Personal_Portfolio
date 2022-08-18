import router from 'express';
import { addProject, deleteProject, getProject, getProjects, updateProject } from '../Controllers/projects.controller.js';
import isAdmin from '../Middleware/isAdmin.js';

// File Handing
import { fileHandle, upload } from '../Middleware/project.images.upload.js';
const projects = router();

// Routes Handling
projects.route("/").get(getProjects).post(isAdmin, upload, fileHandle, addProject)
projects.route("/:id").get(getProject).delete(isAdmin, deleteProject).put(isAdmin, upload, fileHandle, updateProject);

export default projects;