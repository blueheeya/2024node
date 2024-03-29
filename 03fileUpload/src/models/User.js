const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    userName:{type:String, required:true},
    userEmail:{type:String,required:true, unique:true},
    password:{type:String, required:true, unique:true},
    rol: {type:Number},
    image:
        {
            originaFileName:{type:String},
            fileName:{type:String}
        }
    
},{timestemp:true});
const Image = mongoose.model("user",UserSchema);
module.exports = {User};