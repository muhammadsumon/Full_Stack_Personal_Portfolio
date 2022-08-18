import router from 'express';
import { addTechnology, deleteTechnology, getTechnologies, getTechnology, updateTechnology } from '../Controllers/technologies.controller.js';
import isAdmin from '../Middleware/isAdmin.js';

const technologies = router();

technologies.route("/").get(getTechnologies).post(isAdmin, addTechnology);
technologies.route("/:id").get(getTechnology).delete(isAdmin, deleteTechnology).put(isAdmin, updateTechnology);

export default technologies;