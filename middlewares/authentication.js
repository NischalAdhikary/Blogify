const { validateToken } = require("../services/authrntication");

function checkForauthcookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName]
if(!tokenCookieValue) return next()
try {
    const userPayload=validateToken(tokenCookieValue)
    req.user=userPayload
    
} catch (error) {
    
}
return next()
    }
}
function isLoggedin(cookieName) {
    return (req, res, next) => {
        try {
            const tokenCookieValue = req.cookies[cookieName];
            if (!tokenCookieValue) {
                return res.redirect('/user/signin');
            }

            const userPayload = validateToken(tokenCookieValue);
            if (!userPayload) {
                return res.redirect('/user/signin');
            }

            req.user = userPayload; // Optionally attach user info to the request
            next();
        } catch (error) {
            console.error('Error in isLoggedin middleware:', error);
            res.status(500).send('Internal Server Error');
        }
    };
}
module.exports={
    checkForauthcookie,
    isLoggedin
}