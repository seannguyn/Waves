import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
const userLinks = [
    {
        name: 'My account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User information',
        linkTo: '/user/update_profile'
    },
    {
        name: 'My Cart',
        linkTo: '/user/cart'
    },
]

const adminLinks = [
    {
        name: 'Site info',
        linkTo: '/admin/site_info'
    },
    {
        name: 'Add products',
        linkTo: '/admin/add_product'
    },
    {
        name: 'Manage categories',
        linkTo: '/admin/manage_categories'
    }
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item,i)=>(
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )


    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My account</h2>
                    <div className="links">
                        {generateLinks(userLinks)}
                    </div>
                    {props.user.success === true && props.user.user.role === 1 ? 
                    (<div>
                        <h2>My account</h2>
                        <div className="links">
                            {generateLinks(adminLinks)}
                        </div>
                    </div>)
                    : null}

                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);
