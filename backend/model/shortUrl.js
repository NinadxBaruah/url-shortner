const  mongoose =  require("mongoose");

const urlSchema = new mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    urlToRedirect:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    clicks:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports = mongoose.model('URL',urlSchema)