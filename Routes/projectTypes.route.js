const router = require('express');
const { addProjectType, deleteProjectType, getProjectType, getProjectTypes, updateProjectType } = require('../Controllers/projectTypes.controller.js');
const isAdmin = require('../Middleware/isAdmin.js');

const projectType = router();

projectType.route("/").get(getProjectTypes).post(isAdmin, addProjectType);
projectType.route("/:id").get(getProjectType).delete(isAdmin, deleteProjectType).put(isAdmin, updateProjectType);

module.exports = projectType;