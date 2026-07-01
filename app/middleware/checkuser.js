const { get_user } = require("../service/auth.js")

async function restricttologedinuseronly(req, res, next) {

    const userID = req.cookies?.uid

    if (!userID) {
        return res.redirect("/")
    }

    const userData = get_user(userID)

    if (!userData) {
        return res.redirect("/")
    }

    req.user = userData

    next()
}

module.exports = restricttologedinuseronly