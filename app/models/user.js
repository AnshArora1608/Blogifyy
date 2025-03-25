const { Schema, model } = require("mongoose")
const { createHmac, randomBytes } = require("crypto")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        default: "../images/user.png"

    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { TimeStamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('password')) return;
    const salt = randomBytes(16).toString()
    const hashedpassword = createHmac('sha256', salt).update(user.password).digest("hex")
    this.salt = salt
    this.password = hashedpassword
    next()
})

const user = model('users', userSchema)

module.exports = user