


const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://aparnarajendran:aparna@cluster0.2jjfvoh.mongodb.net/Library?retryWrites=true&w=majority')

const Schema = mongoose.Schema

const BookSchema = new Schema({
    
    images : String,
    lastname : String,
    password : String,
    phonenumber : Number ,
    book : String,
    author : String,
    // img : String,




})

var bookdata = mongoose.model('bookdata',BookSchema)
module.exports= bookdata;