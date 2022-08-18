import mongoose from 'mongoose';

const technologyModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        capitalize: true,
    }
})

export default mongoose.model("technologies", technologyModel)