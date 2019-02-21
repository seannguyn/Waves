
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../reduxActions/userActions';
import {initCartLocalStorage} from '../reduxActions/localCartActions'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, reload, isPublic=false, adminRoute = null, linkTo=null) {
    class ProtectedRoute extends Component {

        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            }
            setTimeout(() => {
                this.setState({
                  loading: false
                })
              }, 500)
            //   props.dispatch(auth()) 
        }

        componentDidMount() {
            this.props.dispatch(auth())
            .then(response => {
                console.log("auth step", response)
                if (response.payload.validToken === false) {
                    this.props.dispatch(initCartLocalStorage());
                }
            })   
            .catch(error => console.log("auth step", error))       
            
            // this.props.auth();
            // console.log("State",this.state);
            
            // console.log(this.props.auth()).then(response =>{
            //     let user = this.props.user.userData;
            //     console.log(this.props.user.user);

            //     if(!this.props.user.success){
                    
            //         this.props.history.push('/register_login')
                    
            //     } else{
            //         this.props.history.push('/user/dashboard')
            //     }
            // })
            // this.setState({loading:false})
        
        }

        componentWillUpdate = nextProps => {
            if (!isPublic) {
                if(!nextProps.user.success) {
                    if(reload){
                        this.props.history.push('/register_login')
                        // add parameters here 
                    }
                } else {
                    if (adminRoute && nextProps.user.user.role !== 1) {
                        this.props.history.push('/user/dashboard')
                    } else{
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }
            } 
        }

        render() {

            if(this.state.loading){
                return (
                    <div className="main_loader">
                        <CircularProgress style={{color:'#2196F3'}} thickness={7}/> 
                    </div>
                )
            }
            if (isPublic) {
                return (
                    <ComposedClass {...this.props} user={this.props.user}/>
                 );
            }

            return (
                <ComposedClass {...this.props} user={this.props.user}/>
             );
            
        }
      }

    function mapStateToProps(state) {
        
        return {
            user: state.user,
        }
    }
      
    return connect(mapStateToProps)(ProtectedRoute);

}