const mongoose = require('mongoose');

const technologyModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        capitalize: true,
    }
})

module.exports = mongoose.model("technologies", technologyModel)