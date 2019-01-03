
let admin = (req,res,next) => {
    
    if (req.user.role === 1) {
        next();
    }
    else {
        return res.status(200).json({
            success: "false",
            message: "not authorize to edit"
        })
    }
}

module.exports = {admin};