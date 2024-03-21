const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    name : {
        frist : {type : String, required:true},
        last : {type : String, required:true}
    },
    age : {type: Number},
    email : {type : String}
},{timeRanges:true})

const User = mongoose.model("User", UserSchema)
module.exports = {User}
