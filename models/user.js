const { string } = require("joi");
const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");
const userschema = new mongoose.Schema({
     email:{
        type:String,
        required:true
     },
     image:{
        filename:String,
        url:String
     }
})
userschema.plugin(passportlocalmongoose);
 const user = mongoose.model("user",userschema);
 module.exports = user;