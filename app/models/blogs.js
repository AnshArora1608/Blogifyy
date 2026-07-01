const { Schema, model } = require("mongoose")


const blogSchema = new Schema({
    blog_title: {
        type: String,
        required: true,
        unique:false
    },
    blog_body: {
        type: String,
        required: true,
        unique:false,
    },
    profile: {
        type: String,
        required:true,
    },
    user_id: {
        type: String,
        required:true,
        unique:false,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    created_At:{
        type: Date,
        required:true,
        default:Date.now
    },
    by:{
        type:String,
        required:true
    },
}, { timeStamps: true })


const blogs=model("blogs",blogSchema)


module.exports={blogs}