const JWT=require('jsonwebtoken')
const secretKey='nischaladhikari909090'
function createTokenforUser(user){
    const payload={
    _id:user._id,
    fullName:user.fullName,
    email:user.email,
    profileImageUrl:user.profileImageUrl,
    role:user.role

    }
    const token =JWT.sign(payload,secretKey,{ expiresIn: '1d' })
    return token
}
function validateToken(token){
    const payload=JWT.verify(token,secretKey)
    return payload
}
module.exports={
    validateToken,
    createTokenforUser
}