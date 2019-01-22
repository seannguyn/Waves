import React from 'react'
import Card from '../Card/card'
const CardShop = (props) => {

    const renderCards = (products) => (
        products.filterProduct.size >= 0 ? 
        products.filterProduct.products.map((card) => (
            <Card
                key={card._id}
                {...card}
                grid={props.grid}
            />
        )) : null
    )

    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.products.filterProduct.size ?
                        props.products.size === 0 ?
                            <div className="no_result">
                                Sorry, no results
                            </div>
                        :null
                    :null}
                    {renderCards(props.products)}
                </div>

            </div>
        </div>
    )
}

export default CardShop;
