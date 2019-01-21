import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Auth from './components/Auth'
import Register from './components/Auth/register'
import Layout from './hoc/layout';
import UserDashboard from './components/User';
import ProtectedRoute from './hoc/authRoute'
import Shop from './components/Shop';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/user/dashboard" component={ProtectedRoute(UserDashboard,true)}/>
        <Route exact path="/" component={ProtectedRoute(Home,false,true)}/>
        <Route exact path="/shop" component={ProtectedRoute(Shop,false,true)}/>
        <Route exact path="/register_login" component={ProtectedRoute(Auth,false)}/>
        <Route exact path="/register" component={ProtectedRoute(Register,false)}/>
      </Switch>
    </Layout>
    
  );
}

export default Routes;
