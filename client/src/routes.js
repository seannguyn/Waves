import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Auth from './components/Auth'
import Layout from './hoc/layout';
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register_login" component={Auth}/>
      </Switch>
    </Layout>
    
  );
}

export default Routes;
