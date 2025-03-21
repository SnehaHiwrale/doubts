const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { json } = require("express")
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require("google-auth-library")

exports.register = async (req, res) => {
    try {
        const result = await User.findOne({
            $or: [{ email: req.body.email }, { mobile: req.body.mobile }]
        })
        if (result) {
            return res.status(401).json({ message: "email/mobile already exist" })
        }

        const hash = await bcrypt.hash(req.body.password, 10)
        await User.create({ ...req.body, password: hash })
        res.status(201).json({ message: "user create success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to create",
            error: error.message
        })
    }
}
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const found = await User.findOne({
            $or: [{ email: username }, { mobile: username }]
        })
        if (!found) {
            return res.status(401).json({ message: `${username} not found` })
        }

        const verify = await bcrypt.compare(password, found.password)

        if (!verify) {
            return res.status(401).json({ message: `invalid password` })
        }

        const token = jwt.sign({ _id: found._id }, process.env.JWT_KEY)
        res.cookie("USER", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false
        })
        res.json({
            message: "user login success", result: {
                name: found.name,
                email: found.email,
                mobile: found.mobile
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to login",
            error: error.message
        })
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("USER")
        res.json({
            message: "user logout success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to logout",
            error: error.message
        })
    }
}

exports.allUsers = async (req, res) => {
    try {
        const result = await User.find()
        res.json({
            message: "user logout success", result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to logout",
            error: error.message
        })
    }
}
exports.sendOtp = async (req, res) => {
    try {
        const { mobile } = req.body
        const otp = Math.floor(10000 + Math.random() * 900000)
        // await sendSMS({ numbers: mobile, message: `your otp is ${otp}` })
        const result = await User.findOne({ mobile })
        await User.findByIdAndUpdate(result._id, { otp })
        res.json({ message: "otp send sucess" })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to login",
            error: error.message
        })
    }
}

exports.loginWithOtp = async (req, res) => {
    try {
        const { mobile, otp } = req.body
        const result = await User.findOne({ mobile })
        if (!result) {
            return res.status(401).json({ message: `invalid password` })
        }
        if (result.otp != otp) {
            return res.status(401).json({ message: `invalid otp` })
        }
        const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY)
        res.cookie("USER", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false
        })
        res.json({
            message: "user otp send success", result: {
                name: result.name,
                email: result.email,
                mobile: result.mobile
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to login",
            error: error.message
        })
    }
}
exports.loginWithGoogle = async (req, res) => {
    try {
        const { credential } = req.body

        const client = new OAuth2Client({ clinetId: process.env.GOOGLE_CLIENT_ID })
        const result = await client.verifyIdToken({ idToken: credential })
        if (!result) {
            return res.status(401), json({ message: "unable to login" })
        }
        const { name, email, picture } = result.payload

        res.json({ message: "login success" })
        const data = await User.findOne({ email })
        if (data) {
            //login
            const token = jwt.sign({ _id: data._id }, process.env.JWT_KEY)
            res.cookie("USER", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: false
            })
            res.json({
                message: "user login success", result: {
                    name: data.name,
                    email: data.email,
                    profile: data.profile
                }
            })
        } else {
            //register
            const found = await User.create({ name, email, profile: picture })

            const token = jwt.sign({ _id: found._id }, process.env.JWT_KEY)
            res.cookie("USER", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: false
            })
            res.json({
                message: "user login success", result: {
                    name: found.name,
                    email: found.email,
                    profile: found.profile
                }
            })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to login",
            error: error.message
        })
    }
}