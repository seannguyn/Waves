import React, { Component } from 'react'
import FormField from '../Form/formfield';
import { update, generateData, isFormValid } from '../Form/formActions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { loginUser } from '../../reduxActions/userActions';

class Login extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
        
    // }   

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')
        
        if(formIsValid){
            
            
            // this.props.loginUser(dataToSubmit);
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    console.log(response.payload);
                    this.props.history.push(this.props.redirect.link);
                }else{
                    console.log(response);
                    
                    this.setState({
                        formError: true
                    })
                }
            });

        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>

                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=> this.updateForm(element)}
                    />

                    { this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                    :null}
                    <button onClick={(event)=> this.submitForm(event)}>
                        Log in
                    </button>
                    <Link to="/resetpassword">
                        <button>
                            Forgot Password ?
                        </button>
                    </Link>
                    


                </form>
            </div>
        )
  }
}

const mapStateToProps = (state) => ({
    redirect: state.redirect
})

Login.defaultProps = {
    success: "false",
    user: null,
};

export default connect(mapStateToProps)(withRouter(Login));

// export default connect(mapStateToProps,{loginUser})(withRouter(Login));
