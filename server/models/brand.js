const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 100,
    },
})

const Brand = mongoose.model('Brand',BrandSchema);
module.exports = Brand;