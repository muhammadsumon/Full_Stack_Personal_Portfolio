import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name is required !"],
        capitalize: true,
    },
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: "admin"
    },
    username: {
        type: String,
        required: [true, "username is required !"],
        unique: [true, "Username must be unique !"],
    },
    email: {
        type: String,
        required: [true, "email is required !"],
        lowercase: true,
        unique: [true, "email must be unique !"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email format is invalid !"]
    },
    password: {
        type: String,
        required: [true, "Password is required !"]
    },
}, { timestamps: true })

export default mongoose.model("User", userModel)