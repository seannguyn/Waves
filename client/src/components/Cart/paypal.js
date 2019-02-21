import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            env: 'sandbox',
            currency: 'USD',
            client: {
                sandbox:    'AemWb_JavcZ7dhzknQT0AfHb29Efj65PtSGhNp6XPFXUicgkhS7PKfJQn2G59SZJAymabyrPw-ulPI_v',
                production: 'YOUR-PRODUCTION-APP-ID',
            }
        }
    }

    onSuccess = (payment) =>{ 
        //console.log(JSON.stringify(payment));
        this.props.onSuccess(payment);
         // { 
        //     "paid": true, 
        //     "cancelled": false, 
        //     "payerID": "3GFGQ6GNJ4PWA", 
        //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY", 
        //     "paymentToken": "EC-2J270753AK460261B", 
        //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA", 
        //     "address": { 
        //         "recipient_name": "test buyer", 
        //         "line1": "1 Main St", 
        //         "city": "San Jose", 
        //         "state": "CA", 
        //         "postal_code": "95131", 
        //         "country_code": "US" 
        //     }, 
        //     "email": "fernando.lobo.prez-buyer@gmail.com" 
        // }


    }

    onCancel = (data) =>{
        console.log(JSON.stringify(data))
    }

    onError = (err) => {
        console.log(JSON.stringify(err))
    }

    render() {
        const {env,client,currency} = this.state;
        const {total} = this.props;
        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={this.onError} 
                onSuccess={this.onSuccess} 
                onCancel={this.onCancel} 
                style={{
                    size:'large',
                    color: 'blue',
                    shape: 'rect',
                    label: 'checkout'
                }}
            />
        )
    }
}

export default PayPal;
