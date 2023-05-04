
const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://aparnarajendran:aparna@cluster0.2jjfvoh.mongodb.net/Library?retryWrites=true&w=majority')

const Schema = mongoose.Schema

const LoginSchema = new Schema({
    username: String,
    password: String,
    



})

var logindata = mongoose.model('logindata',LoginSchema)
module.exports= logindata;