const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://aparnarajendran:aparna@cluster0.2jjfvoh.mongodb.net/Library?retryWrites=true&w=majority')

const Schema = mongoose.Schema

const RegisterSchema = new Schema({
    
    firstname : String,
    lastname : String,
    password : String,
    phonenumber : Number ,
    book : String,
    author : String,




})

var registerdata = mongoose.model('registerdata',RegisterSchema)
module.exports= registerdata;