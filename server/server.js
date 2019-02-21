// ============================
// ====== BASIC CONFIG
// ============================
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const Helper = require('./helper');
const asyncCall = require('async');

require('dotenv').config();

// ============================
// ====== MIDDLEWARE
// ============================
const {auth} = require('./middlewares/auth');
const {admin} = require('./middlewares/admin');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookiesParser());

// ============================
// ====== DATABASE CONNECTION 
// ============================
mongoose.Promise = global.Promise
mongoose
.connect(process.env.DATABASE)
.then(() =>{console.log("connected to mongo")})
.catch((e) => console.log("ERROR: CANNOT CONNECT TO MONGO"))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

// ============================
// ====== MODELS
// ============================
const User = require('./models/user');
const Brand = require('./models/brand');
const Wood = require('./models/wood');
const Product = require('./models/product');
const Payment = require('./models/payment');
const SiteInfo = require('./models/siteinfo');

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

    // if req.body.cart.length > 0, save cart
    
    try {
        const user = await User.findOne({email:req.body.email});
        
        // const user = await User.findOneAndUpdate({email:req.body.email}, {cart:req.body.cart}, {new: true});
        if (user) {
            
            // proceed to check password, 
            const matched = await user.isValidPassword(req.body.password,user.password);
            if(matched) {
                
                // merge cart
                const newCart = await Helper.cartIntersection(req.body.cart, user.cart);

                // proceed to give this user a token 
                
                const userWithToken = await user.generateToken(newCart);
                
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
    } catch(error) {
        
        return res.status(200).json({
            success: false,
            userData: error,
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

app.post('/api/users/addToCart',auth, async (req,res)=>{

    // merge cart
    try {
        const newCart = await Helper.cartIntersection(req.body.user.cart, req.body.cartItem);

        await User.findOneAndUpdate({email:req.body.user.email}, {cart:newCart}, {new: true});

        // console.log(req.body.user,req.body.cartItem);

        return res.status(200).json({
            success: true,
            cart: newCart,
        })

    } catch(error) {

        return res.status(200).json({
            success: false,
            error: error,
        })
    }
    
    
});

app.post('/api/users/updateProfile',auth, async (req,res) => {
    try {
        const {firstName,lastName,email,_id} = req.body;

        const user = await User.findOneAndUpdate({_id: _id},{
            email,
            firstName,
            lastName,
        },{new:true});

        return res.status(200).json({
            success: true,
            userData: user
        })

    } catch(error) {
        return res.status(200).json({
            success: false,
            userData: error,
        })
    }
})

app.post('/api/users/removeFromCart', auth, async (req, res) => {

    try {
        const user = await User.findOneAndUpdate({_id: req.body.userId}, {cart:req.body.cart}, {new: true});
        return res.status(200).json({
            success: true,
            userData: user
        })

    } catch(error) {
        return res.status(200).json({
            success: false,
            userData: error,
        })
    }
})

app.post('/api/users/purchaseItem',auth, async (req,res) => {
    // going to get 
    const {payment, cartData, userId} = req.body;
    
    let history = [];
    let transactionData = {};

    cartData.forEach( item => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: payment.paymentID,
        })
    })

    transactionData.user = mongoose.Types.ObjectId(userId);
    transactionData.paymentData = payment;
    transactionData.product = history
    
    console.log(transactionData);

    try {

        const user = await User.findOneAndUpdate({_id:userId}, {
            $push:{history:history}, 
            $set:{cart:[]},
        },{new:true});

        // const newPayment = await new Payment({transactionData});
        const newPayment = new Payment({...transactionData});
        await newPayment.save();

        // async.eachOfSeries(array, stuff, callback);
        asyncCall.eachSeries(
            cartData, 
            async (item) => {
                await Product.findOneAndUpdate({_id:item._id},{$inc:{"sold": item.quantity}},{new: false});
            },
            (err) => {
                if (err) res.status(200).json({success: false,err});

                return res.status(200).json({
                    success: true,
                    userData: user
                })
            }
        );

        
    } catch(error) {
        return res.status(500).json({
            success: false,
            userData: error
        })
    }
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

app.post('/api/products/shop',(req,res) => {

    let orderBy = req.body.orderBy ? req.body.orderBy : 'desc';
    let sortBy =  req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {}

    for (let args in req.body.filter) {
        if(req.body.filter[args].length >0 ){
            if (args === 'price') {
                findArgs[args] = {
                    $gte : req.body.filter[args][0],
                    $lte : req.body.filter[args][1],
                }
            } else {
                findArgs[args] =  req.body.filter[args];
            }
        }
        
    }

    findArgs['publish'] = true;

    Product.
    find(findArgs).
    populate('brand').
    populate('wood').
    sort([[sortBy,orderBy]]).
    skip(skip).
    limit(limit).
    exec((err,products)=>{
        
        if(err) return res.status(200).json({
            success: false,
            size: 101,
            products: []
        })
        res.status(200).json({
            success: true,
            size: products.length,
            products: products
        })
    })
})

app.post('/api/product', auth, admin,(req,res) => {
    const product = new Product(req.body);
    product.save()
    .then((item) => {
        return res.status(200).json({
            success:true,
            productData:item,
        });
    })
    .catch((error)=>{
        return res.status(200).json({
            success:false,
            productData:error,
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
    .populate("brand")
    .populate("wood")
    .then((item) => res.status(200).json({'success': true, productData:item}))
    .catch((err) => res.status(200).json({'success': false,message:err}))
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
    .then((items) => {res.status(200).json({success:"true",productData:items})})
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

app.post('/api/product/uploadImage', auth, admin, formidable(), (req,res) => {

    cloudinary.uploader.upload(req.files.imageFile.path,(result) => {
        return res.status(200).json({
            public_id: result.public_id,
            url: result.url
        })
    }, {
        public_id :`${Date.now()}`,
        resource_type: 'auto'
    })
})

app.get('/api/product/removeImage/:public_id', auth, admin, (req, res) => {
    const public_id = req.params.public_id;
    
    if (public_id) {
        cloudinary.uploader.destroy(public_id,(error,result)=>{

            if(error) return res.json({succes:false,error});
            res.status(200).json({succes:true,message:"deleted images"})
        })

    } else {
        return res.status(200).json({
            success: false,
            message: "no public_id provided"
        })
    }

})

// ********************** SITEINFO **********************
// app.post('/api/siteinfo', async (req, res) => {

//     try {
//         const siteInfo = new SiteInfo(req.body);
//         await siteInfo.save();

//         return res.status(200).json({
//             success: true,
//             siteInfo: siteInfo
//         })
//     } catch(error) {
//         return res.status(200).json({
//             success: false,
//             error
//         })
//     }
    
// })

app.post('/api/siteinfo', auth, admin, async (req, res) => {

    try {
        const {address, email, workingHours, phone} = req.body;
        await SiteInfo.findOneAndUpdate({id: 1},{$set: {address,email,workingHours,phone}});
        const siteInfo = await SiteInfo.find({id: 1});
        return res.status(200).json({
            success: true,
            siteInfo: siteInfo
        })
    } catch(error) {
        return res.status(200).json({
            success: false,
            error
        })
    }
    
})

app.get('/api/siteinfo', auth, admin, async (req, res) => {

    try {
        const siteInfo = await SiteInfo.find({id: 1});
        return res.status(200).json({
            success: true,
            siteInfo: siteInfo
        })
    } catch(error) {
        return res.status(200).json({
            success: false,
            error
        })
    }
    
})

// ============================
// ====== RUN APP 
// ============================
const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`server running at ${port}`);
})
