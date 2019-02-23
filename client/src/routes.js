import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Auth from './components/Auth'
import Register from './components/Auth/register'
import Layout from './hoc/layout';
import UserDashboard from './components/User';
import ProtectedRoute from './hoc/authRoute'
import Shop from './components/Shop';
import AddProduct from './components/User/Admin/add_product'
import ManageCategories from './components/User/Admin/manage_categories';
import Product from './components/Product';
import Cart from './components/Cart';
import UpdateProfile from './components/User/update_profile';
import SiteInfo from './components/User/Admin/site_info'
import NotFound from './components/NotFound';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/user/dashboard" component={ProtectedRoute(UserDashboard,true)}/>
        <Route exact path="/user/update_profile" component={ProtectedRoute(UpdateProfile,true)}/>
        <Route exact path="/admin/add_product" component={ProtectedRoute(AddProduct,true)}/>
        <Route exact path="/admin/manage_categories" component={ProtectedRoute(ManageCategories,true)}/>
        <Route exact path="/admin/site_info" component={ProtectedRoute(SiteInfo,true)}/>
        
        <Route exact path="/" component={ProtectedRoute(Home,false,true)}/>
        <Route exact path="/shop" component={ProtectedRoute(Shop,false,true)}/>

        <Route exact path="/product_detail/:productId" component={ProtectedRoute(Product,false,true)}/>

        <Route exact path="/cart" component={ProtectedRoute(Cart,false,true,null,"/cart")}/>

        <Route exact path="/register_login" component={ProtectedRoute(Auth,false)}/>
        <Route exact path="/register" component={ProtectedRoute(Register,false)}/>
        <Route component={ProtectedRoute(NotFound,false)}/>

      </Switch>
    </Layout>
    
  );
}

export default Routes;
