const mongoose=require('mongoose')


const {Schema}=require('mongoose')
const blogSchema=new Schema({
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,

    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    coverImage:{
        type:String,
        required:false,
    }
},{timestamps:true})

 const Blog=mongoose.model('blog',blogSchema)
 module.exports=Blog