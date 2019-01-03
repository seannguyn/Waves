const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
require('dotenv').config();


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookiesParser());

// connect database
mongoose.Promise = global.Promise
mongoose
.connect(process.env.DATABASE)
.then(() =>{console.log("connected to mongo")})
.catch((e) => console.log("error"))

// ============================
// ====== MODELS
// ============================
const User = require('./models/user');

// ============================
// ====== MIDDLEWARE
// ============================
const {auth} = require('./middlewares/auth');

// ============================
// ====== ROUTE
// ============================

// ** USER **
app.get('/api/user/auth',auth, (req,res) => {
    // has middleware, if user is loggedin, go to the next line of code 
    return res.status(200).json({
        user:req.user,
        stuff:"cool"
    })

})

app.post('/api/user/register', (req,res) => {

    const user = new User(req.body);

    user.save((error,doc) => {
        if(error) return res.json({success:false,error});
        return res.status(200).json({
            success: true,
            userData: doc,
        })
    })
})

app.post('/api/user/login', async (req,res) => {

    const user = await User.findOne({email:req.body.email});
    if (user) {
        // proceed to check password, 
        const matched = await user.isValidPassword(req.body.password,user.password);
        if(matched) {

            // proceed to give this user a token 
            const userWithToken = await user.generateToken();

            return res.cookie('waves_auth',userWithToken.token).status(200).json({
                found: true,
                user: userWithToken,
            });

        }else {
            return res.status(200).json({
                found: true,
                message:"wrong PW",
            })
        }
        
    } else {
        return res.status(200).json({
            found: false,
            message:"user not found",
        })
    }
})

app.get('/api/user/logout',auth ,(req,res) => {

    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc) => {
        if(err) return res.json({logoutSuccess:false,err});
            return res.status(200).json({
                logoutSuccess: true
            })
    })
    
})

// ** BRAND **
// ** PRODUCT **
// ** USER **
app.get('/hey',(req,res)=>{
    return res.status(200).json({
        success: true,
    })
})

// run port and app
const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`server running at ${port}`);
})
