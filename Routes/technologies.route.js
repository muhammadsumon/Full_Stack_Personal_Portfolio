const router = require('express');
const { addTechnology, deleteTechnology, getTechnologies, getTechnology, updateTechnology } = require('../Controllers/technologies.controller.js');
const isAdmin = require('../Middleware/isAdmin.js');

const technologies = router();

technologies.route("/").get(getTechnologies).post(isAdmin, addTechnology);
technologies.route("/:id").get(getTechnology).delete(isAdmin, deleteTechnology).put(isAdmin, updateTechnology);

module.exports = technologies;