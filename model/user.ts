import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
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
    photoURL: {
        type: String,
        default: null, 
      },
})

const User = mongoose.model('User',userSchema);
export default User;