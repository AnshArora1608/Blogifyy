const { blogs } = require("../models/blogs")
const comments = require("../models/comment")
const user = require("../models/user")
const { parseJwt } = require("../service/auth")


async function post_addblog(req, res) {
    const token = req.cookies?.uid
    const tokenvalue = parseJwt(token)
    const user_id = tokenvalue.id
    const name = await user.findById(user_id)
    // console.log(name)
    const by = name.name
    // console.log(by)
    const blog_title = req.body.title
    const blog_body = req.body.body
    const profile = req.file.filename
    // console.log(token,tokenvalue,id,title,body,filename)
    blogs.create({
        blog_title,
        blog_body,
        profile,
        user_id,
        by,
    })

    res.redirect("/home/home")
}

async function commentpost(req, res) {
    const blog_id = req.params.id
    const comment = req.body.Comment
    const token = req.cookies?.uid
    const tokenvalue = parseJwt(token)
    const email = tokenvalue.email
    const check_User = await user.findOne({ email })
    const blog = await blogs.findById(blog_id)
    const name = check_User.name
    const created_by = tokenvalue.id
    if (!comment) return res.send("bhag")
    await comments.create({
        comment,
        created_by,
        name,
        blog_id
    })
    // console.log(blog_id)
    const comm = await comments.find({ blog_id })
    return res.render("blog", { check_User, blog, comm })
}

module.exports = { post_addblog, commentpost }