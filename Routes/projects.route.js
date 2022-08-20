const {
    addProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject
} = require('../Controllers/projects.controller.js');
const { fileHandle, upload } = require('../Middleware/project.images.upload.js');
const isAdmin = require('../Middleware/isAdmin.js');
const router = require('express');

// File Handing
const projects = router();

// Routes Handling
projects.route("/").get(getProjects).post(isAdmin, upload, fileHandle, addProject)
projects.route("/:id").get(getProject).delete(isAdmin, deleteProject).put(isAdmin, upload, fileHandle, updateProject);

module.exports = projects;