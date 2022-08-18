import mongoose from 'mongoose';

const projectModel = mongoose.Schema({
    "name": {
        type: String,
        required: true,
        capitalize: true,
    },
    "description": {
        type: String,
        required: true,
        capitalize: true,
    },
    "images": [{
        type: Object,
        required: true,
    }],
    "link": {
        "live": {
            type: String,
            required: true,
        },
        "code": {
            type: String,
            default: null
        },
    },
    "responsibility": {
        type: String,
        required: true,
        capitalize: true,
    },
    "type": {
        type: mongoose.Types.ObjectId,
        ref: "projecttypes",
        required: true,
    },
    "category": {
        type: mongoose.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    "usedTechnology": [
        {
            type: mongoose.Types.ObjectId,
            ref: "technologies",
            required: true,
        }
    ],
}, {
    timestamps: true
})

export default mongoose.model("projects", projectModel);