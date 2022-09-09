const { info, error } = require('./logging')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function unknownEndpoint(req, res, next) {
    return res.json({ error: "unknown endpiont " })
}

function errorHandler(err, req, res, next) {
    if (err.name === "ValidationError") {
        return res.status(400).json({ error: "Validation error" })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        })
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            error: "token has expired!"
        })
    }
    console.log('error handling middleware')
    error(err.name)
    next(err)
}

function tokenExtractor(req, res, next) {
    try {
        const token = req.get('authorization')
        if (!token) {
            return res.status(401).json({ error: "invalid token" })
        }

        const accessToken = token && token.split(' ')[1]

        req.token = accessToken

        next()
    } catch (error) {
        next(error)

    }
}

function userExtractor(req, res, next) {
    try {
        const accessToken = jwt.verify(req.token, process.env.SECRET_KEY)

        req.user = accessToken.userId

        next()

    } catch (error) {
        next(error)
    }
}



module.exports = { errorHandler, unknownEndpoint, userExtractor, tokenExtractor }