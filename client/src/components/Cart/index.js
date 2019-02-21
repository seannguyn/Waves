import React, { Component } from 'react'
import {connect} from 'react-redux';
import { fetchProductCart } from '../../reduxActions/localCartActions';
import UserLayout from '../../hoc/userLayout';
import SideLayout from '../../hoc/sideLayout';
import ProductBlock from './productBlock';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import {removeCartItem} from '../../reduxActions/localCartActions';
import {removeFromCart, purchaseSuccess} from '../../reduxActions/userActions'
import PayPal from './paypal';
import MyButton from '../Button/mybutton';
import { redirect } from '../../reduxActions/redirectActions';


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            productData: [],
            total: 0,
            showTotal: false,
            showSuccess: false,
        }
    }

    componentDidMount() {

        if (this.props.user.success) {
            this.props.dispatch(fetchProductCart(this.props.user.user.cart))
            .then(response => {
                this.calculateTotal(response.payload.productData);
                this.setState({
                    loading: false,
                    productData: response.payload.productData
                })
            });
        } else {
            this.props.dispatch(fetchProductCart(this.props.localCart.localCart))
            .then(response => {
                this.calculateTotal(response.payload.productData);
                this.setState({
                    loading: false,
                    productData: response.payload.productData
                })
            });
        }        
        
    }

    

    // when you do remove, mess aroun with this.state ONLY 
    
    cartSection = (state) => (
        this.props.user.success ? 
        <UserLayout>
            <h1>My cart</h1>
            <div className="user_cart">
                <ProductBlock
                    cartDetail={state.productData}
                    type="cart"
                    removeItem={(id)=> this.removeFromCart(id)}
                />
            </div>
            {this.showTotal()}
            {this.showPayment()}
        </UserLayout>
        :
        <SideLayout>
            <h1>My cart</h1>
            <div className="user_cart">
                <ProductBlock
                    cartDetail={state.productData}
                    type="cart"
                    removeItem={(id)=> this.removeFromCart(id)}
                />
            </div>
            {this.showTotal()}
            {this.showPayment()}
        </SideLayout>
    )

    transactionError(error) {
        console.log("error",error);
    }

    transactionCanceled(cancelData) {
        console.log("cancel",cancelData);
    }

    transactionSuccess(payment) {

        // up to here, build backend first before handling frontend. 
        const {productData} = this.state;

        const submitData = {
            payment,
            cartData: productData,
            userId: this.props.user.user._id
        }

        this.props.dispatch(purchaseSuccess(submitData))
        .then(response => {
            if (response.payload.success) {
                this.setState({
                    showTotal: false,
                    showSuccess: true,
                    productData: [],
                    total: 0
                })
            } else {
                console.log("ERROR BUDDY",response.payload.userData);
            }
            
        })
        .catch(error => {
            console.log("ERROR BUDDY",error); 
        });

        console.log("success",payment);
    }

    showNoItemMessage = () =>(
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You have no items
            </div>
        </div>
    )

    showThankYouMessage = () => (
        <div className="cart_success">
            <FontAwesomeIcon icon={faSmile}/>
            <div>
                THANK YOU
            </div>
            <div>
                YOUR ORDER IS NOW COMPLETE
            </div>
        </div>
    )

    showTotal = () => (
        this.state.showTotal ?
            <div>
                <div className="user_cart_sum">
                    <div>
                        Total amount: $ {this.state.total}
                    </div>
                </div>
            </div>
            
        :
            this.state.showSuccess ? this.showThankYouMessage() : this.showNoItemMessage()
    )

    showPayment = () => (
        this.state.showTotal ? this.props.user.success ?
            <div className="paypal_button_container">
                <PayPal
                    total={this.state.total}
                    onError={this.transactionError.bind(this)}
                    onSuccess={this.transactionSuccess.bind(this)}
                    onCancel={this.transactionCanceled.bind(this)}
                /> 
            </div>
        : <MyButton
            type="login_button"
            title="Login to Checkout"
            addStyles={{
                margin: '10px 0 0 0'
            }}
            runAction={()=>{
                console.log("Login de");
                this.props.dispatch(redirect("/cart"));
                this.props.history.push("/register_login");
            }}
        /> : null
    )

    calculateTotal = (productData) => {

        var total = 0;
        
        if (productData.length > 0) {
            productData.forEach((item) => {
                total += parseInt(item.price, 10) * item.quantity;
            })
        }
        if (total > 0) {
            this.setState({
                total,
                showTotal: true
            });
        } else {
            this.setState({
                total,
                showTotal: false
            });
        }
    }

    removeFromCart (id) {

        const newProductData = this.state.productData.filter((item)=> item._id !== id);
        const newLocalCart = this.props.localCart.localCart.filter((item) => item.id !== id);
        this.calculateTotal(newProductData);

        if (this.props.user.success) {
            this.props.dispatch(removeFromCart(id,this.props.user.user));
        } else {
            this.props.dispatch(removeCartItem(newLocalCart))
        }

        this.setState({
            productData: newProductData,
        })
    }

    render() {
                
        if (this.state.loading) {
            return (
                <div>LOADING</div>
            )
        } else {
            return (
                this.cartSection(this.state)
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        localCart: state.localCart
    }
}

export default connect(mapStateToProps)(Cart);

