import React, { Component } from 'react'

class ProductBlock extends Component {

    renderCartImage = (images) => {
        if(images.length > 0){
            return images[0].url
        } else {
            return '/images/image_not_availble.png'
        }
    }


    renderItems = (cartDetail,removeItem) => (
        cartDetail ?
            cartDetail.map(product=>(
                <div className="user_product_block" key={product._id}>
                    <div className="item">
                        <div
                            className="image"
                            style={{background:`url(${this.renderCartImage(product.images)}) no-repeat`}}
                        ></div>
                    </div>
                    <div className="item">
                        <h4>Product name</h4>
                        <div>
                            {product.brand.name} {product.name}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Quantity</h4>
                        <div>
                            {product.quantity}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Price</h4>
                        <div>
                           $ {product.price}
                        </div>
                    </div>
                    <div className="item btn">
                       <div className="cart_remove_btn" 
                            onClick={()=> removeItem(product._id)}>
                            Remove
                       </div>
                    </div>
                </div>
            ))

        :null
    )

    render() {
        const {cartDetail,removeItem} =this.props
        
        return (
            this.renderItems(cartDetail,removeItem)
        )
    }
}

export default ProductBlock;


// import React from 'react'

// const ProductBlock = ({cartDetail,removeItem}) => {

//     const renderCartImage = (images) => {
//         if(images.length > 0){
//             return images[0].url
//         } else {
//             return '/images/image_not_availble.png'
//         }
//     }


//     const renderItems = () => (
//         cartDetail ?
//             cartDetail.map(product=>(
//                 <div className="user_product_block" key={product._id}>
//                     <div className="item">
//                         <div
//                             className="image"
//                             style={{background:`url(${renderCartImage(product.images)}) no-repeat`}}
//                         ></div>
//                     </div>
//                     <div className="item">
//                         <h4>Product name</h4>
//                         <div>
//                             {product.brand.name} {product.name}
//                         </div>
//                     </div>
//                     <div className="item">
//                         <h4>Quantity</h4>
//                         <div>
//                             {product.quantity}
//                         </div>
//                     </div>
//                     <div className="item">
//                         <h4>Price</h4>
//                         <div>
//                            $ {product.price}
//                         </div>
//                     </div>
//                     <div className="item btn">
//                        <div className="cart_remove_btn" 
//                             onClick={()=> removeItem(product._id)}>
//                             Remove
//                        </div>
//                     </div>
//                 </div>
//             ))

//         :null
//     )


//     return (
//         <div>
//             {renderItems()}
//         </div>
//     );
// }

// export default ProductBlock;
