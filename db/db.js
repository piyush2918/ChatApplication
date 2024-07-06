const mongoose = require("mongoose") ; 
mongoose.connect("mongodb://localhost:27017/webtextdb"  , {
    useNewUrlParser:true
}) ; 

const userschema =new mongoose.Schema({
    email:String , 
    password:String 
})

const user = mongoose.model("user" ,userschema ) ;

module.exports={
    user
}