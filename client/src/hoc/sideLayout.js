import React from 'react'
import {Link} from 'react-router-dom';

const userLinks = [
    {
        name: 'Cart Section',
        linkTo: '/cart'
    },
]


const SideLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item,i)=>(
            <Link to={item.linkTo} key={i}>
                <h2>{item.name}</h2>
            </Link>
        ))
    )

    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <div className="links">
                        {generateLinks(userLinks)}
                    </div>
                    

                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    )
}


export default (SideLayout);
