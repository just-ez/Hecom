

// Express App
const express = require('express')
const app = express()
const { urlencoded } = require('express')
const fs = require('fs')
const formidable = require('formidable')

// our DB
const mongoose = require('mongoose')
require('dotenv').config();

const Blog = require('./models/Blog')
const User = require('./models/user')




// importing cloudinary
const cloudinary = require('cloudinary')
// configing cloudinary
cloudinary.config({ 
   cloud_name: 'eos-tech', 
   api_key: '641824977648761', 
   api_secret: '3-czwZ4QV5Rth6X8bivODTst8Lg' 
 });

// our views Engine
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.json())
 app.use(urlencoded({extended: true}))


 


  
// blog routes

app.post('/',(req,res)=>{
  const user = new User(req.body)
  user.save()
  .then((result)=>{
     res.redirect('/blogs')
  })
  .catch((err)=> console.log(err))
})

app.get('/blogs',(req,res)=>{   

 Blog.find().sort({createdAt: -1})
 .then((result)=> res.render('index', {blog: result}))
     .catch((err)=> console.log(err))
})  

 app.get('/blogs/:id', (req,res)=>{
    let id = req.params.id
    Blog.findById(id).then((result)=>{
       res.render('blog_page', {blog: result}) 
    })
 })   


// about routes
app.get('/about',(req,res)=>{  
   res.render('about')
})
app.get('/contact',(req,res)=>{  
   res.render('contact')
})

// create route
app.get('/create',(req,res)=>{
   res.render('createBlog') 

})
app.post('/blogs/create', (req,res)=>{ 

   
   const blog = new Blog(req.body) ;
   blog.save().then((result)=>{
      console.log(`${result.image}`);
 
//       cloudinary.v2.uploader.upload(``, 
//   { public_id: 'image' },  
//   function(error, result) {console.log(result); });
       
      res.redirect('/blogs')   
        
   })
   .catch((err)=> console.log(err))
    

}) 


app.get('/404',(req,res)=>{ 
   res.render('404')
})    
console.log(process.env.DBuri);

let port = process.env.PORT || 8000
// connecting to db
mongoose.connect(process.env.DBuri).then(()=> {
   app.listen(port,()=>{
      console.log(`listening on port ${port}`);})
}).catch((err)=> console.log(err))

  

 
   