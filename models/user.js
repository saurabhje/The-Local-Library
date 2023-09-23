const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
        username: { type: String, required: true },
        password: { type: String, required: true }
    });

userSchema.virtual("url").get(function () {
    return `/user${this._id}`;
});
module.exports = mongoose.model("User", userSchema);