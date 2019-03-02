const User = require('../models/user')

let resetTokenValidation = async (req,res,next) => {
    const {resetToken} = req.body;
    try {
        const validUser = await User.findOne({"resetToken.token":resetToken});
        if (validUser!==null) {

            next();
    
        } else {
            return res.status(200).json({
                validResetToken: false,
                success: false
            }) 
        }
    }
    catch (e) {
        console.log("error in resetToken middleware",e);
    }

}

module.exports = {resetTokenValidation};