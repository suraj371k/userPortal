import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    address: [
        {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String
        }
    ]
}, {timestamps: true})

const User = mongoose.model("User" , userSchema)

export default User;