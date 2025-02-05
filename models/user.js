const mongoose=require('mongoose')
const { Schema } = mongoose; 
const {createTokenforUser}=require('../services/authrntication')
const { createHmac, randomBytes } = require('node:crypto');
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,

    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:'/images/6596121.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }

},{timestamp:true})
userSchema.pre('save',function(next){
    const user=this
    if(!user.isModified("password")) return;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex")
    this.salt=salt
    this.password=hashedPassword
    next()



})
userSchema.static('matchPasswordandToken',async function(email,password){
    const user=await this.findOne({email})
    if(!user) throw new Error('User not found')
    const salt=user.salt
    const hashedPassword=user.password
    const userProvidedhash=createHmac("sha256",salt).update(password).digest("hex")
   if(hashedPassword!==userProvidedhash) throw new Error('password incorrect')
   const token=createTokenforUser(user)
return token
})
const User= mongoose.model('user',userSchema)
module.exports=User