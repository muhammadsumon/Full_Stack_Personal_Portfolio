const isAdmin = (req, res, next) => {

    const role = req.currentUserRole;

    if (role === "admin") {
        next()
    } else {
        res.status(400).send({
            "message": "only admin can perform this action !!"
        })
    }
}

export default isAdmin;