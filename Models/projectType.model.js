const mongoose = require('mongoose');

const projectTypeModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        capitalize: true,
    }
})

module.exports = mongoose.model("projecttypes", projectTypeModel);