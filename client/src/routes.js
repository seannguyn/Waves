import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Auth from './components/Auth'
import Register from './components/Auth/register'
import Layout from './hoc/layout';
import UserDashboard from './components/User';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/user/dashboard" component={UserDashboard}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register_login" component={Auth}/>
        <Route exact path="/register" component={Register}/>
      </Switch>
    </Layout>
    
  );
}

export default Routes;
