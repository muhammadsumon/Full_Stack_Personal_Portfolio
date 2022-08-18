import mongoose from 'mongoose';

const projectTypeModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        capitalize: true,
    }
})

export default mongoose.model("projecttypes", projectTypeModel);