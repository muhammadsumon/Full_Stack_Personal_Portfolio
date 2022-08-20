const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {

    const token = jwt.sign({
        "nothing": "nothing"
    }, process.env.App_Jwt_Secret);

    res.status(200).json(token);

}

module.exports = generateToken;