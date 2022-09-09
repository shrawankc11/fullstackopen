const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3
    },
    name: String,
    passwordHash: String,
    blog: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString()
        delete obj._id
        delete obj.__v
        delete obj.passwordHash
    }
})

module.exports = mongoose.model("User", userSchema)