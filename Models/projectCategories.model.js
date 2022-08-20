const mongoose = require('mongoose');

const projectCategoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        capitalize: true,
    }
})

module.exports = mongoose.model("categories", projectCategoryModel);