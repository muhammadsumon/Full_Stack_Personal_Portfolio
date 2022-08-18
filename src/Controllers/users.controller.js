import bcrypt from 'bcryptjs';
import users from "../Models/users.model.js";


/**
 * @desc {*} Get All Users
 * @route {*} GET /api/users/
 * @access private
 */

const getUsers = (req, res) => {

    users.find({}, (err, docs) => {
        if (err) {
            res.status(400).json({
                "error": "there are server side error !!",
                "message": err
            })
        } else {
            res.status(200).send(docs);
        }
    })

}

/**
 * @desc {*} Add New User
 * @route {*} POST /api/users/
 * @access private
 */

const addUser = (req, res) => {

    // Generate a salt password for creating hash password
    bcrypt.genSalt(10, function (err, salt) {

        // Check user inputed password is valid or not
        const isValidPassword = req.body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g);

        // If user inputed password is valid
        if (isValidPassword) {

            // Create hash password with salt password
            bcrypt.hash(req.body.password, salt, function (err, hash) {

                // Create New User
                users.create({ ...req.body, password: hash }, ((err, doc) => {
                    if (!doc) {

                        // if username already taken or user given username is not unique
                        if (err.code == 11000 && err.keyPattern.username) {
                            res.status(400).send({
                                "error": "Username must be unique !!"
                            })
                        }

                        // if email already taken or user given email is not unique
                        else if (err.code == 11000 && err.keyPattern.email) {
                            res.status(400).send({
                                "error": "Email must be unique !!"
                            })
                        } else {
                            res.status(400).send({
                                "error": "Something went wrong !!",
                                "message": err
                            })
                        }
                    } else {
                        res.status(200).send({
                            "message": "User created Successfully",
                            "createdDocument": doc
                        })
                    }
                }));

            });
        }

        // If user inputed password is wrong
        else {
            res.status(400).send({
                "error": "Password must be minimum eight characters, at least one letter and one number !!"
            })
        }

    });
}


/**
 * @desc {*} Get Single User
 * @route {*} GET /api/users/:id
 * @access private
 */

const getUser = (req, res) => {

    const id = req.params.id;

    users.findById(id, (err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If user info updated successfully
        else if (doc !== null) {
            res.status(200).send(doc)
        }

        // If user id wrong
        else if ((err === null) && (doc === null)) {
            res.status(404).send({
                "error": "User id wrong !",
                "message": err
            })

        }

    })
}


/**
 * @desc {*} Update User
 * @route {*} PUT & PATCH /api/users/:id
 * @access private
 */

const updateUser = (req, res) => {

    const id = req.params.id;
    const { name, username, email, password, role } = req.body;

    // any empty key value is not acceptable
    if (name === "" || username === "" || email === "" || password === "" || role === "") {
        res.status(400).send({
            "message": "any empty key value is not acceptable !!"
        })
    } else {

        // if user want to update password
        if (password) {

            // Generate a salt password to create a hash password
            bcrypt.genSalt(10, function (err, salt) {

                // Validate whether user inputted password must be minimum eight characters, at least one letter and one number or not
                const isValidPassword = req.body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g);

                if (isValidPassword) {

                    // Create a hash password with salt password
                    bcrypt.hash(req.body.password, salt, function (err, hash) {

                        // Update User Info
                        users.findByIdAndUpdate(id, { ...req.body, password: hash }, { new: true, runValidators: true }, (
                            (err, doc) => {

                                // If any error occur
                                if (err !== null) {
                                    if (err.code == 11000 && err.keyPattern.username) {
                                        res.status(400).send({
                                            "error": "username must be unique !!"
                                        })
                                    } else if (err.code == 11000 && err.keyPattern.email) {
                                        res.status(400).send({
                                            "error": "email must be unique !!"
                                        })
                                    } else {
                                        res.status(400).send({
                                            "error": "Something went wrong !",
                                            "message": err
                                        })
                                    }
                                }

                                // If user info updated successfully
                                else if (doc !== null) {
                                    res.status(200).send({
                                        "message": "User updated Successfully",
                                        "updatedDocument": doc
                                    })
                                }

                                // If user id wrong
                                else if ((err === null) && (doc === null)) {

                                    res.status(404).send({
                                        "error": "User id wrong !",
                                        "message": err
                                    })

                                }
                            })
                        );
                    });
                } else {
                    res.status(400).send({
                        "error": "password must be minimum eight characters, at least one letter and one number !!"
                    })
                }

            });
        }

        // if user want to update other key without password key
        else {
            users.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true }, (
                (err, doc) => {
                    if (err !== null) {
                        if (err.code == 11000 && err.keyPattern.username) {
                            res.status(400).send({
                                "error": "username must be unique !!"
                            })
                        } else if (err.code == 11000 && err.keyPattern.email) {
                            res.status(400).send({
                                "error": "email must be unique !!"
                            })
                        } else {
                            res.status(400).send({
                                "error": "Something went wrong !",
                                "message": err
                            })
                        }
                    } else if (doc !== null) {
                        res.status(200).send({
                            "message": "User updated Successfully",
                            "updatedDocument": doc
                        })
                    } else if ((err === null) && (doc === null)) {

                        res.status(404).send({
                            "error": "User id wrong !",
                            "message": err
                        })

                    }
                })
            );
        }
    }
}


/**
 * @desc {*} Delete User
 * @route {*} DELETE /api/users/:id
 * @access private
 */

const deleteUser = (req, res) => {

    const id = req.params.id;

    users.findByIdAndDelete(id, (err, doc) => {

        // If any error occur
        if (err !== null) {
            res.status(400).send({
                "error": "Something went wrong !",
                "message": err
            })
        }

        // If user deleted successfully
        else if (doc !== null) {
            res.status(200).send({
                "message": "User deleted Successfully",
                "deletedDocument": doc
            })
        }

        // If user id wrong
        else if ((err === null) && (doc === null)) {

            res.status(404).send({
                "error": "User id wrong !",
                "message": err
            })

        }
    });
}


export {
    getUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser,
};

