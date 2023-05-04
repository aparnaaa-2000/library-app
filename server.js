// var http=require('http')
// http.createServer((request,response)=>{
//     response.write('hai')
//     response.end()
    
// }).listen(3000,()=>{console.log('server started at port http://localhost:3000')})
const express = require('express')
const server = express()
const bookdata= require('./src/models/bookdata')
const authordata =require('./src/models/authordata')
const registerdata = require('./src/models/register')
const logindata = require('./src/models/logindata')

const multer=require('multer')
const { query } = require('express')
server.use(express.urlencoded({extended:true}))

server.use(express.static('./public'))

server.set('view engine','ejs')
server.set('views','./src/views')

const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'./public/images/')
  },
  filename: function(req,file,cb){
    cb(null,file.originalname)
  }
})
const upload = multer({
  storage:storage,
  limits:{
    fieldsize:1024*1024*5
  }
})

server.get('/',(req,res)=>{
  res.render('library')
})

server.get('/Home', function (req, res) {
  res.render('Home ')
})
server.get('/Books/bookdetails', function (req, res) {
  res.render('bookdetails')
})

server.get('/Books', function (req, res) {
  bookdata.find().then((detail)=>{
    console.log("details====>",detail);
    res.render("Books",{detail})

  })
  
})

server.get('/Author',(req,res)=>{
  authordata.find().then((details)=>{
    res.render("Author",{details})  

  })
     
})

server.get('/addbook',(req,res)=>{
  res.render("addbook")   
})
server.get('/addauthor',(req,res)=>{
  res.render("addauthor")
})
server.get('/register',(req,res)=>{
  res.render("register")   
})
server.get('/Login',(req,res)=>{
  res.render("Login")   
})
server.post('/savebook',upload.single('image'),function(req,res){
  var item = {
    images:req.file.filename,
    lastname:req.body.lastname,
    password:req.body.password,
    phonenumber:req.body.phonenumber,
    book:req.body.book,
    author:req.body.author,
  }
  console.log(item);
  var book= bookdata(item)
  book.save();
  // res.redirect('/books')

})

server.post('/saveauthor',upload.single('images'), function(req,res){
  var hi ={
    name:req.body.name,
    dateofbirth:req.body.dateofbirth,
    place:req.body.place,
    image:req.file.filename,
  }
  console.log(hi);
  var author= authordata(hi)
  author.save();
})
server.get('/saveregister',function(req,res){
  var hm={
    firstname:req.query.firstname,
    lastname:req.query.lastname,
    password:req.query.password,
    phonenumber:req.query.phonenumber,
    email:req.query.email,
  }
  console.log(hm);
  var register=registerdata(hm)
  register.save();
})
server.get('/savelogin',function(req,res){
  var ya={
    username:req.query.username,
    password:req.query.password,
  }
  console.log(ya);
  var Login=logindata(ya);
  Login.save();
})

server.get('/:bookid',(req,res)=>{
  const id = req.params.bookid
  console.log(id);
  bookdata.findOne({_id:id}).then((bookdata)=>{
    console.log("book====>",{bookdata});
    res.render("bookdetails",{bookdata})

  })
  .catch((err)=>{
    res.status(200).json({
      data:err
    })
  })
})
// server.get('/:bookid',(req,res)=>{
//   const idd = req.params.bookid;
//   console.log(idd);
//   bookdata.deleteOne({_id:idd}).then((bookdata)=>{
//     console.log("book==>",{bookdata});
//     res.redirect('/book')
    
//   })
// })
server.get('/delete2/:bookid',(req,res)=>{
  const dele1 = req.params.bookid
  console.log(dele1);
  bookdata.deleteOne({_id:dele1}).then((bookdata)=>{
    console.log(bookdata)
    res.redirect('/Books')
  })
})
server.get('/editbooks/:bookid',(req,res)=>{
  const edit = req.params.bookid
  console.log("editdata==>",edit);
  bookdata.findOne({_id:edit}).then((bookdata)=>{
    console.log("book==>",bookdata);
    res.render('editbooks',{bookdata})
  })
})
server.get('/bookupdate',function(req,res){
  var ID=req.query.id
  console.log("edit======>",ID,req.query);
  var it = {
    
    lastname:req.query.lastname,
    password:req.query.password,
    phonenumber:req.query.phonenumber,
    book:req.query.book,
    author:req.query.author,
  }
  console.log("it",it);
  bookdata.updateOne({_id:ID},{$set:it}).then((data)=>{
    console.log(data);
    res.json({
      message:"data updated"
    })
  })
})
server.get('/deleted/:authorid',(req,res)=>{
  const dele12 = req.params.authorid
  console.log(dele12);
  authordata.deleteOne({_id:dele12}).then((details)=>{
    console.log(details)
    res.redirect('/Author')
  })
})
server.get('/editauthor/:authorid',(req,res)=>{
  const edit1 = req.params.authorid
  console.log("editdata==>",edit1);
  authordata.findOne({_iddd:edit1}).then((authordata)=>{
    console.log("author==>",authordata);
    res.render('editauthor',{authordata})
  })
})
server.get('/authorupdate',function(req,res){
  var IDDD=req.query.id
  console.log("edit======>",IDDD,req.query);
  var items = {
    
    name:req.query.name,
    dateofbirth:req.query.dateofbirth,
    place:req.query.place,
  }
  console.log("items",items);
  bookdata.updateOne({_id:IDDD},{$set:items}).then((data)=>{
    console.log(data);
    res.json({
      message:"data updated"
    })
  })
})
server.listen(3000,()=>{console.log("server started at port http://localhost:3000")})




