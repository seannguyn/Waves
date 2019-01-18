const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const JWT = require('jsonwebtoken')
require('dotenv').config();

// create schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type:Number,
        default: 0
    },
    token:{
        type:String,
        default:""
    }
})
// function that is called before data is saved on DB
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            // generate a salt
            const salt = await bcrypt.genSalt(10);
            const pwHash = await bcrypt.hash(this.password, salt);

            this.password = pwHash;
            next();
        } catch(error) {
            next(error)
        }
    } else {
        next();
    }
    
})

// models methods
UserSchema.methods.isValidPassword = async function(newPassword,hashPW) {
    try {
        return await bcrypt.compare(newPassword, hashPW)
    } catch(error) {
        throw new Error(error)
    }
}

// models methods
UserSchema.methods.generateToken = async function() {
    try {

        const token = JWT.sign({
            iss: 'Waves',
            sub: this._id,
            iat: new Date().getTime(),
            // exp: new Date().getTime() + 60*60*3, // current date + 1
        }, process.env.JWT_KEY)

        this.token = token;
        await this.save()

        return this;
    
    } catch(error) {
        throw new Error(error)
    }
}

UserSchema.statics.findByToken = async function(token) {
    try {
        var thisUser = this;       
        const validUser = await JWT.verify(token, process.env.JWT_KEY,async function(err,decode){
            
            if(err) return null;
            else {
                const user = await thisUser.findOne({"token":token});
                return user;
            }
        });

        return validUser;

    } catch(error) {
        throw new Error(error)
    }
}
 
// create model
const User = mongoose.model('user',UserSchema);
module.exports = User;