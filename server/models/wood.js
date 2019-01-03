const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WoodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 100,
    },
})

const Wood = mongoose.model('Wood',WoodSchema);
module.exports = Wood;