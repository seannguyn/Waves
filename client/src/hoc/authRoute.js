
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../reduxActions/userActions';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, reload, isPublic=false, adminRoute = null) {
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
              props.dispatch(auth()) 
        }

        componentDidMount() {
            // this.props.dispatch(auth())            
            
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
            user: state.user
        }
    }
      
    return connect(mapStateToProps)(ProtectedRoute);
    // return connect(mapStateToProps,{auth,dispatch})(ProtectedRoute);
    // connect((state, props) => ({
    //     clients: state.firestore.ordered.clients
    //   }))
  
}




// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { auth } from '../reduxActions/userActions';
// import CircularProgress from '@material-ui/core/CircularProgress';

// export default function(ComposedClass,reload,adminRoute = null){
//     class AuthenticationCheck extends Component {

//         state = {
//             loading: true
//         }

//         componentDidMount(){
//             this.props.dispatch(auth()).then(response =>{
//                 let userSuccess = this.props.user.success;

//                 if(!userSuccess){
//                     if(reload){
//                         this.props.history.push('/register_login')
//                     }
//                 } else{
//                     if(adminRoute && !user.isAdmin){
                        
//                     } else{
//                         if(reload === false){
//                             this.props.history.push('/user/dashboard')
//                         }
//                     }
//                 }
//                 this.setState({loading:false})
//             })
//         }


//         render() {
//             if(this.state.loading){
//                 return (
//                     <div className="main_loader">
//                         <CircularProgress style={{color:'#2196F3'}} thickness={7}/> 
//                     </div>
//                 )
//             }
//             return (
//                <ComposedClass {...this.props} user={this.props.user}/>
//             );
//         }
//     }

//     function mapStateToProps(state){
//         return {
//             user: state.user
//         }
//     }

//     return connect(mapStateToProps)(AuthenticationCheck)
// }


