const exp = require('express');
const { getProjectCategories, getProjectCategory, addProjectCategory, deleteProjectCategory, updateProjectCategory } = require('../Controllers/projectCategories.controller.js');
const isAdmin = require('../Middleware/isAdmin.js');

const projectCategory = exp();

projectCategory.route("/").get(getProjectCategories).post(isAdmin, addProjectCategory);

projectCategory.route("/:id").get(getProjectCategory).delete(isAdmin, deleteProjectCategory).put(isAdmin, updateProjectCategory);

module.exports = projectCategory;