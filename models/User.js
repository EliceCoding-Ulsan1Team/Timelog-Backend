const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //띄어쓰기 방지
        unique: 1,
    },
    id: {
        type: String,
        maxlength: 20,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 6,
    },
    // role: {
    //     type: Number,
    //     defalt: 0
    // },
    token: {
        type: String,
      },
      tokenExp: {
        type: Number,
      },
})

const User = mongoose.model("User", userSchema);

module.exports = { User };