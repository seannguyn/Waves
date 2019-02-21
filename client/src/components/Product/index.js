import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getProductById, clearGetProductById} from '../../reduxActions/productActions';
import PageTop from '../Shop/page_top';
import ProductInfo from './productInfo'
import ProductImage from './productImages'
class Product extends Component {

    componentDidMount () {

        this.props.dispatch(getProductById(this.props.match.params.productId))
        .then(response => {
            if (!response.payload.success) {
                this.props.history.push('/');
            }
        })
        .catch(error => console.log(error));
    }
    
    componentWillUnmount() {
        this.props.dispatch(clearGetProductById());
    }

    addToCartHandler (id)  {
        console.log(id,"ADD TO CART");
    }

    render() {
        return (
            <div>
                <PageTop
                    title="Product Detail"
                />
                <div className="container">
                {
                    this.props.products.productDetail.success ?
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div style={{width:'500px'}}>
                                <ProductImage
                                    images={this.props.products.productDetail.productData.images}
                                />
                            </div>
                        </div>
                        <div className="right">
                            {/* <ProdNfo
                                addToCart={(id)=> this.addToCartHandler(id)}
                                detail={this.props.products.prodDetail}
                            /> */}
                            <ProductInfo 
                                detail={this.props.products.productDetail.productData}
                                addToCart={this.addToCartHandler.bind(this)}
                                />
                        </div>
                    </div>
                    : 'Loading'
                }

                </div>                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Product);
