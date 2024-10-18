import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength : 3
    },
    email : {
        type: String,
        required: true,
        unique:true
    },
    password : {
        type : String,
        required: true,
        select: false,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

const User = mongoose.model('User',userSchema);
export default User;