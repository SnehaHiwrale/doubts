const mongoose = require("mongoose")
module.exports = mongoose.model("blog", new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    title: { type: String, require: true },
    desc: { type: String, require: true },
    hero: { type: String, require: true },
}, { timestamps: true }))
