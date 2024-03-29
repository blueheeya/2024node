const { default: mongoose } = require("mongoose");

const ImageSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    images:[
        {
            originaFileName:{type:String},
            fileName:{type:String}
        }
    ]
},{timestemp:true});
const Image = mongoose.model("image",ImageSchema);
module.exports = {Image};