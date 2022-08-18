import router from 'express';
import { addProjectType, deleteProjectType, getProjectType, getProjectTypes, updateProjectType } from '../Controllers/projectTypes.controller.js';
import isAdmin from '../Middleware/isAdmin.js';

const projectType = router();

projectType.route("/").get(getProjectTypes).post(isAdmin, addProjectType);
projectType.route("/:id").get(getProjectType).delete(isAdmin, deleteProjectType).put(isAdmin, updateProjectType);

export default projectType;