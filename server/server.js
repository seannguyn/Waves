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
const Brand = require('./models/brand');
const Wood = require('./models/wood');
const Product = require('./models/product');

// ============================
// ====== MIDDLEWARE
// ============================
const {auth} = require('./middlewares/auth');
const {admin} = require('./middlewares/admin');

// ============================
// ====== ROUTE
// ============================

// ********************** USER **********************
app.get('/api/user/auth', auth, (req,res) => {
    // has middleware, if user is loggedin, go to the next line of code 
    
    return res.status(200).json({
        userData: req.user,
        success: true,
        validToken: true,
    })

})

app.post('/api/user/register', (req,res) => {

    const user = new User(req.body);

    user.save((error,doc) => {
        if(error) return res.json({success:false,error, userData:"error in registration"});
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
                success: true,
                userData: userWithToken,
            });

        }else {
            return res.status(200).json({
                success: false,
                userData:"wrong PW",
            })
        }
        
    } else {
        return res.status(200).json({
            success: false,
            userData:"user not found",
        })
    }
})

app.get('/api/user/logout',auth ,(req,res) => {

    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc) => {
        if(err) return res.json({logoutSuccess:false,err});
            return res.status(200).json({
                success: false,
                userData:"Logout successful",
            })
    })
    
})

// ********************** BRAND **********************
app.post('/api/brand', auth, admin, (req,res) => {

    const brand = new Brand(req.body);
    brand.save((error,doc) => {
        if (error) {
            return res.status(200).json({
                success:"false",
                message: error
            })
        }
        else {
            return res.status(200).json({
                success:"true",
                brandData: doc,
            })
        }
    })
    
})

app.get('/api/brands', (req,res) => {

    const brands = Brand.find({}, (error, brands) => {
        if (error){
            return res.status(200).json({
                success:"false",
                message:error,
            }) 
        } else {
            return res.status(200).json({
                success:"true",
                brandData:brands,
            }) 
        }
    });
    
})

app.delete('/api/brand/:id', auth, admin, (req,res) => {

    Brand.findOne({_id:req.params.id})
    .then((item) => item.remove().then(() => res.json({'success': 'true'})))
    .catch((err) => res.status(404).json({'success': 'false',message:err}))
    
})

// ********************** WOOD **********************
app.post('/api/wood', auth, admin, (req,res) => {

    const wood = new Wood(req.body);
    wood.save((error,doc) => {
        if (error) {
            return res.status(200).json({
                success:"false",
                message: error
            })
        }
        else {
            return res.status(200).json({
                success:"true",
                woodData: doc,
            })
        }
    })
    
})

app.get('/api/woods', (req,res) => {

    const woods = Wood.find({}, (error, woods) => {
        if (error){
            return res.status(200).json({
                success:"false",
                message:error,
            }) 
        } else {
            return res.status(200).json({
                success:"true",
                woodData:woods,
            }) 
        }
    });
    
})

app.delete('/api/wood/:id', auth, admin, (req,res) => {

    Wood.findOne({_id:req.params.id})
    .then((item) => item.remove().then(() => res.json({'success': 'true'})))
    .catch((err) => res.status(404).json({'success': 'false',message:err}))
    
})

// ********************** FRETS **********************
// create model, create route

// ********************** PRODUCT **********************
app.post('/api/product', auth, admin,(req,res) => {
    const product = new Product(req.body);
    product.save()
    .then((item) => {
        return res.status(200).json({
            success:"true",
            productData:item,
        });
    })
    .catch((error)=>{
        return res.status(200).json({
            success:"false",
            message:error,
        });
    })
})

app.get('/api/products', (req,res) => {
    Product.find({})
    .then((items) => res.status(200).json({'success': 'true', productData:items}))
    .catch((err) => res.status(404).json({'success': 'false',message:err}));
})

app.get('/api/product/:product_id', (req,res) => {
    Product.findOne({_id:req.params.product_id})
    .then((item) => res.json({'success': 'true', productData:item}))
    .catch((err) => res.status(404).json({'success': 'false',message:err}))
})

// app.get('/api/product/:brand_id', (req,res) => {
    
// })

// app.get('/api/product/:wood_id', (req,res) => {
    
// })

app.get('/api/products/query', (req,res) => {

    let type = req.query.type;
    var items = [];

    if (type === "array") {
        itemsId = req.query.id.split(',');
        items = itemsId.map((item)=> {
            return mongoose.Types.ObjectId(item)
        });
    } else {
        items = [mongoose.Types.ObjectId(req.query.id)];
    }

    Product
    .find({"_id":{$in:items}})
    .populate("brand")
    .populate("wood")
    .then((items) => {res.status(200).json({success:"true",products:items})})
    .catch((error) => {res.status(404).json({success:"false",message:error})})

})

// BY ARRIVAL
// /otherquery?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /otherquery?sortBy=sold&order=desc&limit=100
app.get('/api/products/otherquery',(req,res)=>{

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.
    find().
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    limit(limit)
    .then((items) => res.json({'success': true, products:items}))
    .catch((err) => res.status(404).json({'success': false ,message:err}))
})

app.delete('/api/product/:product_id', auth, admin, (req,res) => {
    Product.findOne({_id:req.params.product_id})
    .then((item) => item.remove().then(() => res.json({'success': 'true'})))
    .catch((err) => res.status(404).json({'success': 'false',message:err}))
})

// run port and app
const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`server running at ${port}`);
})
