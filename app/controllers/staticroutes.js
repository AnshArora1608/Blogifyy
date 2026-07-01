const user = require("../models/user")
const { blogs } = require("../models/blogs")
const { get_user, parseJwt } = require("../service/auth")
const comments=require("../models/comment")

async function homepage(req, res) {
    try {

        const token = req.cookies?.uid;

        // If user not logged in
        if (!token) {
            return res.redirect("/user/signin");
        }

        const tokenvalue = parseJwt(token);
        const email = tokenvalue?.email;

        if (!email) {
            return res.redirect("/user/signin");
        }

        const check_User = await user.findOne({ email });

        if (!check_User) {
            return res.redirect("/user/signin");
        }

        const blog = await blogs
            .find({})
            .sort({ created_At: -1 }) // newest blogs first
            .lean();

        res.render("home", {
            check_User,
            blog
        });

    } catch (error) {

        console.error("Homepage Error:", error);

        res.status(500).render("error", {
            message: "Something went wrong"
        });

    }
}
async function addblogs(req, res) {
    const token = req.cookies?.uid
    const tokenvalue = parseJwt(token)
    const email = tokenvalue.email
    const check_User = await user.findOne({ email })
    if (!check_User) res.redirect("/user/signin")
    res.render("addblog", { check_User })
}
async function viewblog(req, res) {
    const id = req.params.id
    const blog = await blogs.findById(id)
    const token = req.cookies?.uid
    const tokenvalue = parseJwt(token)
    const email = tokenvalue.email
    const comm=await comments.find({'blog_id': id})
    const check_User = await user.findOne({ email })
    if (!check_User) res.redirect("/user/signin")
        res.render("blog", { blog, check_User,comm })
}
async function about(req,res){
    const token = req.cookies?.uid
    const tokenvalue = parseJwt(token)
    const email = tokenvalue.email
    const check_User = await user.findOne({ email })
    if (!check_User) res.redirect("/user/signin")
    res.render("about",{check_User})
}



module.exports = { homepage, addblogs, viewblog,about }