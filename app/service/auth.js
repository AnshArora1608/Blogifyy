const jwt = require("jsonwebtoken")
const secret = "ansh$123@$"

function set_user(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        }, secret)
}

function get_user(token) {
    if (!token) return null
    jwt.verify(token, secret)
    return token
}

function parseJwt(token) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
module.exports = {
    set_user,
    get_user,
    parseJwt
}
