// const { register } = require("../controllers/auth.controller")
const auth = require("../controllers/auth.controller")
const { protectedRoute } = require("../middleware/auth.middleware")

const router = require("express").Router()

router
    .post("/register", auth.register)
    .post("/login", auth.login)
    .post("/login-withOtp", auth.loginWithOtp)
    .post("/send-otp", auth.sendOtp)
    .post("/logout", auth.logout)
    .get("/users", protectedRoute, auth.allUsers)
    .post("/oauth", auth.loginWithGoogle)
module.exports = router