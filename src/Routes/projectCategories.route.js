import router from 'express';
import { addProjectCategory, deleteProjectCategory, getProjectCategories, getProjectCategory, updateProjectCategory } from '../Controllers/projectCategories.controller.js';
import isAdmin from '../Middleware/isAdmin.js';

const projectCategory = router();

projectCategory.route("/").get(getProjectCategories).post(isAdmin, addProjectCategory);
projectCategory.route("/:id").get(getProjectCategory).delete(isAdmin, deleteProjectCategory).put(isAdmin, updateProjectCategory);

export default projectCategory;