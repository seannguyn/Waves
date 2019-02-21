const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SiteInfoSchema = new Schema({
    address: {
        type: String,
        required: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        maxlength: 100,
    },
    workingHours: {
        type: String,
        required: true,
        maxlength: 100,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 100,
    },
    id:{
        type: Number,
        default: 1
    },
})

const SiteInfo = mongoose.model('SiteInfo',SiteInfoSchema);
module.exports = SiteInfo;