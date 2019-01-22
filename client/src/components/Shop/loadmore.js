import React from 'react'
import CardShop from './card_shop'

const LoadMore = (props) => {



    return (
        <div>
            <CardShop
                products={props.products}
            />
            {props.products.filterProduct.size > 0 ? (<div className="load_more_container">
                <span onClick={props.loadMore}>
                    Load More
                </span>
            </div>) : null}
            
        </div>
    )
}

export default LoadMore;
