const path = require("path")
const express = require("express")
const app = express()
const PORT = 890
const staticroute = require("./app/routes/staticroutes")
const SignInUpRoute = require('./app/routes/signinuproutes.js')
const mongoose = require("mongoose")
const cookieparser = require("cookie-parser")

mongoose.connect('mongodb://127.0.0.1:27017/Blogify').then(console.log("mb connected"))


const restricttologedinuseronly = require("./app/middleware/checkuser")
app.use(cookieparser())
app.use(express.static("public"))


app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs")

app.set("views", path.resolve("./app/views"))

// app.use("/",restricttologedinuseronly,staticroute)
app.use("/home", restricttologedinuseronly, staticroute)
app.use("/", SignInUpRoute)

app.listen(PORT, () => {
    console.log(`Server Started At Port :${PORT}`)
})

