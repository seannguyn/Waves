import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import {logoutUser} from '../../../reduxActions/userActions'
import {clearCartLocalStorage} from '../../../reduxActions/localCartActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publicLinks: [
                {
                    name: 'Cart',
                    path: '/cart',
                    public: true,
                },
                {
                    name: 'Guitar',
                    path: '/shop',
                    public: true,
                },
                {
                    name: 'Home',
                    path: '/',
                    public: true
                },
            ],
            userLinks: [
                {
                    name: 'Login',
                    path: '/register_login',
                    public: true
                },
                {
                    name: 'My Account',
                    path: '/user/dashboard',
                    public: false,
                },
                {
                    name: 'Logout',
                    path: '/',
                    public: false
                },
            ]
        }
    }

    showLink(links,status) {
        

        var displayLinks = [];

        switch (status) {
            case 'public':
                links.forEach((item) => {
                    displayLinks.push(item);
                })
                break;

            case 'private':
                links.forEach((item) => {
                    if (this.props.user.success) {
                        if (item.public === false) {
                            displayLinks.push(item);
                        }
                    }
                    else if (!this.props.user.success && item.public) {
                        displayLinks.push(item);
                    }
                })
                break;

            default:
                break;
        }

        return displayLinks.map((item,i)=>{
            if(item.name !== 'Cart'){
                return this.defaultLink(item,i)
            } else {
                return this.cartLink(item,i)
            }
        })
        
    }

    logoutHandler = () => {
        this.props.dispatch(logoutUser())
        .then(response => {
            this.props.dispatch(clearCartLocalStorage());
            this.props.history.push('/');
        })
        
    }

    componentWillUpdate = nextProps => {
        
        if (nextProps.user.success === false && nextProps.user.success === "Logout successful") {
            this.props.history.push('/');
        }

    }

    cartLink = (item,i) => {
        var cartCount = 0;
        if (this.props.user.success) {
            cartCount = this.props.user.user.cart.length;
        } else {
            cartCount = this.props.localCart.length
        }
        return (
            <div className="cart_link" key={i}>
                <span>{cartCount}</span>
                <Link to={item.path}>
                    {item.name}
                </Link>
            </div>
        )
    }

    defaultLink = (item,i) => (
        item.name === 'Logout' ?
            <div className="log_out_link"
                key={i}
                onClick={()=> this.logoutHandler()}
            >
                {item.name}
            </div>

        :
        <Link to={item.path} key={i}>
            {item.name}
        </Link>
    )

    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            WAVES
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLink(this.state.userLinks,'private')}
                        </div>
                        <div className="bottom">
                            {this.showLink(this.state.publicLinks,'public')}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        localCart: state.localCart.localCart
    }
}

export default connect(mapStateToProps)(withRouter(Header));