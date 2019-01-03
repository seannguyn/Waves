const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        required: true,
        maxlength: 100,
        unique: 1
    },
    description: {
        type:String,
        required:true,
        maxlength: 2000,
    },
    price:{
        required: true,
        type: Number,
        maxlength: 255
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref:"Brand",
        required:true,
    },
    wood:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Wood",
    },
    shipping:{
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    frets:{
        required: true,
        type: Number
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default:[]
    }
},{timestamps:true});

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;