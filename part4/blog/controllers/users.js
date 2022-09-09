const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

userRouter.get('/', async (req, res, next) => {
    const users = await User.find({}).populate('blog')
    return res.json(users)
})

//both password and username should be present
//username should be unique
//both password and usename should be 3 character long
userRouter.post('/register', async (req, res, next) => {
    const { username, name, password } = req.body

    //business logic 
    //for checking user credentials with business standards
    if (!username || !password) {
        return res.status(400).json({ error: 'username or password missing' })
    }

    if (username.length <= 3 || password.length <= 3) {
        return res.status(401).json({ error: "username and password should be at least 3 character long!" })
    }

    const matchUser = await User.findOne({ username })

    if (matchUser) {
        return res.status(401).json({ error: 'username already in use!' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userObj = {
        username,
        name,
        passwordHash
    }

    const user = new User(userObj)
    const savedUser = await user.save()
    return res.status(201).json(savedUser)
})

userRouter.post('/tokenVerification', async (req, res, next) => {
    const user = req.body
    try {
        const verify = jwt.verify(user.token, process.env.SECRET_KEY)
        if (verify) {
            return res.status(200)
        }
    } catch (err) {
        next(err)
    }
})

userRouter.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ error: "wrong user credentials!" })
        }

        const checkPassword = await bcrypt.compare(password, user.passwordHash)

        if (!user || !checkPassword) {
            return res.status(403).json({ error: "invalid username or password!" })
        }

        const token = jwt.sign({ username: user.username, userId: user._id }, process.env.SECRET_KEY)

        return res.status(200).json({ token, username: user.username, userId: user._id })
    } catch (err) {
        next(err)
    }
})


module.exports = userRouter
