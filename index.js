

// Express App
const express = require('express')
const app = express()
const { urlencoded } = require('express')

const cors = require('cors')
// our DB
const mongoose = require('mongoose')
require('dotenv').config();

const Blog = require('./files/models/Blog')
const User = require('./files/models/user')





 

  


// our views Engine
app.set('view engine', 'ejs')
app.use(express.static('views'))
app.use(express.json())
 app.use(urlencoded({extended: true}))

 app.use(cors({
   origin: '*',
   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
 


  
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
       res.render('blog_page', {blog: result},) 
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

app.post('/blogs/create', (req,res)=>{ 
    
   const blog = new Blog(req.body) 
   blog.save().then((result)=>{
      console.log(`${result.body}`);
      
   })
   .catch((err)=> console.log(err))
    res.redirect('/blogs')  

}) 
app.get('/create',(req,res)=>{
 
   res.render('createBlog') 

})

app.post('/contact' ,(req,res)=>{
   res.send('API not ready')
})              
app.use('/',(req,res)=>{  
   res.render('404')
})    


let port = process.env.PORT || 8000
// connecting to db
mongoose.connect(process.env.DBuri).then(()=> {
   app.listen(port,()=>{
      console.log(`listening on port ${port}`);})
}).catch((err)=> console.log(err))

  

 
   