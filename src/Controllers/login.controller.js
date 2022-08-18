import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from "../Models/users.model.js";

const logIn = (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({
            "message": "Username & password fields are required !"
        })
    } else {
        users.findOne({ username }, ((err, doc) => {

            // If no user found with user inputed username
            if ((err === null) && (doc === null)) {
                res.status(400).send({
                    "message": "No such user with this username !"
                })
            }

            // If user found with user inputed username
            else if (doc !== null) {
                const dbPassword = doc.password;
                const userInputedPassword = password;

                // Check user inputed password right or wrong
                bcrypt.compare(userInputedPassword, dbPassword,
                    ((err, isValidPassword) => {

                        if (isValidPassword) {

                            // Generate jwt token
                            const token = jwt.sign({
                                "userId": doc._id,
                                "name": doc.name,
                                "role": doc.role,
                                "username": doc.username,
                                "email": doc.email
                            }, process.env.App_Jwt_Secret, {
                                expiresIn: "7d"
                            });

                            // Set Cookie
                            res.cookie("biscuit", token, {
                                maxAge: 6.048e+8,
                                httpOnly: true,
                                withCredentials: true,
                                sameSite: 'none',
                                secure: true,
                                signed: true
                            })

                            res.status(200).send({
                                "accessToken": token,
                                "user": {
                                    "id": doc._id,
                                    "name": doc.name,
                                    "role": doc.role,
                                    "username": doc.username,
                                    "email": doc.email
                                }
                            })

                        } else if (err) {
                            res.status(400).send({
                                "message": "Something went wrong !",
                                "errors": err
                            })
                        } else {
                            res.status(400).send({
                                "message": "Invalid password !"
                            })
                        }
                    })
                );
            }

            // If any error occur
            else if (err !== null) {
                res.status(400).send({
                    "message": "Something went wrong !",
                    "erors": err
                })
            }
        }))
    }

}

export default logIn;