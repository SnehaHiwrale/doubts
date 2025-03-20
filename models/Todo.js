const mongoose = require("mongoose")
module.exports = mongoose.model("todo", new mongoose.Schema({
    task: { type: String, require: true },
    desc: { type: String, require: true },
    complete: { type: Boolean, require: true },
}, { timestamps: true }))
// timestamps:true => createAt and updateAt
