const user = require("../models/user")
const { blogs } = require("../models/blogs")
const { createHmac } = require("crypto")
const { set_user } = require("../service/auth")

// LANDING PAGE
async function landing(req, res) {
    res.render("landing_page")
}


// SIGN IN
async function signin(req, res) {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send("Enter email and password")
    }

    const check_User = await user.findOne({ email })

    if (!check_User) {
        return res.render("landing_page", { error: "User not found. Please sign up." })
    }

    const salt = check_User.salt
    const newhashedpassword = createHmac('sha256', salt)
        .update(password)
        .digest("hex")

    if (newhashedpassword !== check_User.password) {
        return res.render("landing_page", { error: "Invalid password" })
    }

    const blog = await blogs.find({})

    const token = set_user(check_User)
    res.cookie("uid", token)

    res.render("home", {
        check_User,
        blog
    })
}


// SIGN UP
async function signup(req, res) {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).send("Enter full details")
    }

    const existingUser = await user.findOne({ email })

    if (existingUser) {
        return res.render("landing_page", { error: "User already exists. Please sign in." })
    }

    await user.create({
        name,
        email,
        password
    })

    res.redirect("/signin")
}


module.exports = {
    landing,
    signin,
    signup
}