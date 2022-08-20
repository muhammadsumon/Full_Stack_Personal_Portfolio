const Router = require('express');
const { addUser, deleteUser, getUser, getUsers, updateUser } = require('../Controllers/users.controller.js');

const User = Router();

User.route("/").get(getUsers).post(addUser);
User.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

module.exports = User;