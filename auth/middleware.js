module.exports = {
    loginVerification,
    registerVerification
}

function loginVerification(req, res, next){
     const { username, password}  = req.body
    if(username && password ){
         next()
     } else {
         res.status(401).json({message: "Please enter user creditials"})
     }
}


function registerVerification(req, res, next){
    const {username, password, role, email} = req.body

    if(!username || !password || !role || !email){
        res.status(401).json({message: "Please enter credentials"})
    } else {
        next()
    }
}