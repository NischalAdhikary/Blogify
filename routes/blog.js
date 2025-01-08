const {Router}=require('express')
const multer  = require('multer')
const path=require('path')
const Blog=require('../models/blog')
const Comment=require('../models/comment')
const {isLoggedin}=require('../middlewares/authentication')

const router=Router()

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
     
    },
    filename: function (req, file, cb) {
        const fileName=`${Date.now()}-${file.originalname}`
        cb(null,fileName)
      
      
    }
  })
  
  const upload = multer({ storage: storage })
  router.get('/add-blog',isLoggedin('token'),(req,res)=>{
    if(!req.user) return res.redirect('/user/signin')
    res.render('addblog',{
        user:req.user,

    })
 })
 router.post('/',upload.single("coverImage"),async(req,res)=>{
    const {title,content}=req.body
   const blog=await Blog.create({
    title,
    content,
    createdBy:req.user._id,
    coverImage:`/uploads/${req.file.filename}`


   })
   return res.redirect(`/blog/${blog._id}`)
    
    
 



})
router.get('/:id',async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy')
    const comment=await Comment.find({blogId:req.params.id}).populate('createdBy')
    console.log(blog);
    
    return res.render('blog',{
        user:req.user,
        blog,
        comment
    })
})
router.post('/comment/:id',async(req,res)=>{
  const comment=  await Comment.create({
        content:req.body.content,
        blogId:req.params.id,
        createdBy:req.user._id,
    })
  console.log(comment);
  res.redirect(`/blog/${req.params.id}`)
  
})
    
 

module.exports=router