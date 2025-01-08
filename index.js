const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const app=express();
const cookieParser=require('cookie-parser')
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog')
const Blog=require('./models/blog')
const { checkForauthcookie } = require('./middlewares/authentication');
const { error } = require('console');

const PORT=8000;
mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>{
    console.log("mongodb connected");
    
}).catch((error)=>{
    console.log(error)
    

})
app.set('view engine','ejs')
app.set('views',path.resolve("./views"))
app.use(express.static(path.resolve("./public")))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForauthcookie('token'))
app.get('/',async(req,res)=>{
    const allblog=await Blog.find({})

    res.render('home',{
        user:req.user,
        blogs:allblog
    })
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(PORT,()=>{
    console.log(`Server connected at ${PORT}`);
    
})