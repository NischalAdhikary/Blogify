const {Router}=require('express')
const User=require('../models/user')
const Blog=require('../models/blog')
const router=Router()
router.get('/signin',(req,res)=>{
    return res.render('signin')
})
router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect('/')
})
router.post('/signup',async(req,res)=>{
    const {email,password,fullName}=req.body
    await User.create({
        fullName,
        email,
        password,
    })
    return res.redirect('/')

})
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body
  try {
    const token=await User.matchPasswordandToken(email,password);
 
    return res.cookie('token',token,{
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) ,
        httpOnly: true,  // Optional: Makes it safer
        secure: false
    }).redirect('/')
    
  } catch (error) {
    return res.render('signin',{
        error:"Incorrect email or password"
    })
    
  }
    


})
router.get('/posts',async(req,res)=>{
    const post=await Blog.find({createdBy:req.user._id})
    res.render('userpost',{
        post,
        user:req.user
    })
    
   
})


module.exports=router