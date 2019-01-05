import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './Resources/css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
    
, document.getElementById('root'));

