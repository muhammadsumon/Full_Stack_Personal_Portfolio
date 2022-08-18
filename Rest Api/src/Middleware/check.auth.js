import { } from 'cookie';
import jwt from 'jsonwebtoken';
import users from "../Models/users.model.js";

const checkAuth = (req, res, next) => {

    const cookie = req.signedCookies.biscuit ? req.signedCookies.biscuit : null;
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    // check whether user have valid cookies or not
    if (cookie) {

        try {
            // Verify is valid cookie or not
            const isValidCookie = jwt.verify(cookie, process.env.App_Jwt_Secret);

            users.findById(isValidCookie.userId, ((err, doc) => {

                // If user found
                if (doc !== null) {
                    req.currentUser = isValidCookie;
                    req.currentUserRole = isValidCookie.role;

                    // if cookie is valid go destination
                    next()
                }

                // If no user found as a result cookie will mark as invalid
                else if (err === null && doc === null) {
                    res.status(400).send({
                        "message": "invalid cookie !"
                    })
                }
            }));

        } catch (error) {
            res.status(400).send({
                "message": "invalid cookies !"
            })
        }

    } else if (token) {
        try {
            // Verify is valid token or not
            const isValidToken = jwt.verify(token, process.env.App_Jwt_Secret);

            // if token is valid go destination
            next()
        } catch (error) {
            res.status(400).send({
                "message": "invalid token !"
            })
        }
    } else {
        res.status(400).send({
            "message": "you are not authorized !"
        })
    }
}

export default checkAuth;