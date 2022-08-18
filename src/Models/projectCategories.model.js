import mongoose from 'mongoose';

const projectCategoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        capitalize: true,
    }
})

export default mongoose.model("categories", projectCategoryModel);