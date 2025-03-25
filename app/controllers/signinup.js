const user = require("../models/user")
const { blogs } = require("../models/blogs")
const { createHmac, randomBytes } = require("crypto")
const { get_user, set_user } = require("../service/auth")

async function signup(req, res) {
    res.render("signup")
}
async function signin(req, res) {
    res.clearCookie("uid");

    res.render("signin")
}
async function postsignin(req, res) {
    const email = req.body.email
    const password = req.body.password
    const check_User = await user.findOne({ email })
    if (!check_User) {
        return res.render("signup")
    }

    const salt = check_User.salt
    // console.log(salt)
    const newhashedpassword = createHmac('sha256', salt).update(password).digest("hex")
    const oldhashedpassword = check_User.password
    // console.log(newhashedpassword, oldhashedpassword, check_User)
    if (newhashedpassword != oldhashedpassword) return res.redirect("/user/signup")
    
    const blog = await blogs.find({})
    // console.log(blog)
    const token = set_user(check_User)
    res.cookie("uid", token)
    res.render("home", { check_User, blog }
    )

}
async function postsignup(req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if(!name||!email||!password){
        res.status(404).send("Enter Full Details")
    
    }
    // console.log(name, email, password)
    const newuser = await user.findOne({ email })
    if (newuser) {
        return res.send("user already exists")
    }
    user.create({
        name,
        email,
        password,
    })
    res.redirect("/user/signin")
}


module.exports = { signup, signin, postsignin, postsignup }