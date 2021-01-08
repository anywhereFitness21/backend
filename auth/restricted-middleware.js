const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({you:'are not welcome here'})
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({message: "Please add token "})
    }
}