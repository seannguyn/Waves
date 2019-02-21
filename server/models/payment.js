const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    paymentData: {
        type:Object,
        default:[]
    },
    product:{
        type:Array,
        default:[]
    }

})

const Payment = mongoose.model('Payment',PaymentSchema);
module.exports = Payment;