const { required } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },//passportlocalmongoose will automatically add 'username' and 'password' field to the user
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema)