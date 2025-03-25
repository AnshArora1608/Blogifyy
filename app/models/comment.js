const { Schema, model } = require("mongoose")

const commentSchema= new Schema({
    comment:{
        type:String,
        required:true
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    name:{
        type:String,
        required:true,
    },
    blog_id:{
        type:Schema.Types.ObjectId,
        ref:"blogs"
    },
},{timestamps:true})


const comments = model('comments', commentSchema)

module.exports = comments