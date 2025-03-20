const mongoose = require("mongoose")
module.exports = mongoose.model("user", new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    profile: { type: String, },

    mobile: { type: String, },
    password: { type: String, },
    isActive: { type: String, default: true },
    otp: { type: String },
}, { timestamps: true }))
// timestamps:true => createAt and updateAt
