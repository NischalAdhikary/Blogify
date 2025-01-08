const {Schema,model, default: mongoose}=require('mongoose')
const { schema } = require('./user')
const commentSchema=new Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"

    
    },
    createdBy:{
         type:Schema.Types.ObjectId,
        ref:"user"
    }

})
const Comment=mongoose.model('comment',commentSchema)
module.exports=Comment