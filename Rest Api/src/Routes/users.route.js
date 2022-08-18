import { Router } from 'express';
import { addUser, deleteUser, getUser, getUsers, updateUser } from '../Controllers/users.controller.js';
import isAdmin from '../Middleware/isAdmin.js';

const User = Router();

User.route("/").get(getUsers).post(addUser);
User.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

export default User;