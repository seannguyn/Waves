import React from 'react'
import ManageBrands from './manage_brands'
import ManageWood from './manage_woods'; 
import UserLayout from '../../../hoc/userLayout';

const ManageCategories = ()  => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageWood/>
        </UserLayout>
    )
}

export default ManageCategories;
