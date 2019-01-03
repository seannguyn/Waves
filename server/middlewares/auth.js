const User = require('../models/user');

let auth = async (req,res,next) => {

    const token = req.cookies.waves_auth;
    const validUser = await User.findByToken(token);
    
    if (validUser!==null) {

        req.user = validUser;
        req.token = validUser.token;
        next();

    } else {
        return res.status(200).json({
            validToken: "false",
        }) 
    }    
}

module.exports = {auth} ;   