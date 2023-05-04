const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://aparnarajendran:aparna@cluster0.2jjfvoh.mongodb.net/Library?retryWrites=true&w=majority')

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
    
    name : String,
    dateofbirth : String,
    place : String,
    image : String,




})

var authordatas = mongoose.model('authordata',AuthorSchema)
module.exports= authordatas;