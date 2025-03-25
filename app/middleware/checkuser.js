const { get_user } = require("../service/auth.js")


async function restricttologedinuseronly(req, res, next) {
    
    const userID = req.cookies?.uid
    // console.log(req)
    if (!userID) {
        return res.redirect("/user/signup")
    }
    const user =get_user(userID)
    if (!user) {
        res.redirect("/user/signup")
    }
    req.user=user
    // console.log(req.user)
    next()
}

module.exports=restricttologedinuseronly