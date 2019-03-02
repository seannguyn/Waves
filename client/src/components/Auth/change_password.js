import React, { Component } from 'react'
import FormField from '../Form/formfield';
import {isFormValid, generateData, update} from '../Form/formActions'
import axios from 'axios';
import {resetPassword} from '../../reduxActions/userActions';

class ChangPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            _id: "",
            formError: false,
            errorMsg: "Please check your data",
            formSuccess:'',
            formdata:{
                password: {
                    element: 'input',
                    value: '',
                    config:{
                        name: 'password_input',
                        type: 'password',
                        placeholder: 'Enter your new password'
                    },
                    validation:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage:''
                },
                passwordConfirm: {
                    element: 'input',
                    value: '',
                    config:{
                        name: 'password_confirm_input',
                        type: 'password',
                        placeholder: 'Confirm your new password'
                    },
                    validation:{
                        required: true,
                        confirm: 'password'
                    },
                    valid: false,
                    touched: false,
                    validationMessage:''
                },
            }
        }
    }

    async componentDidMount() {
        const request = await axios.get(`/api/user/resetPassword/${this.props.match.params.resetToken}`);

        if (!request.data.success) {
            alert(request.data.errorMsg,"You will be redirected");
            setTimeout(()=>{
                this.props.history.push('/resetpassword');
            },2000)
            
        } else {
            this.setState({valid: true,_id:request.data._id})
        }
    }

    async submitForm(e) {
        e.preventDefault();
        let dataToSubmit = generateData(this.state.formdata,'login');
        dataToSubmit = {
            ...dataToSubmit,
            _id: this.state._id,
            resetToken: this.props.match.params.resetToken
        }
        let formIsValid = isFormValid(this.state.formdata,'login')
        
        if(formIsValid){
            
            this.props.dispatch(resetPassword(dataToSubmit)).then((response)=>{
                
                if(response.payload.success){
                    this.setState({
                        formSuccess: true,
                        formError: false
                    },()=>{
                        setTimeout(()=>{
                            this.props.history.push('/register_login')
                            this.setState({
                                formSuccess: false,
                                formError: true
                            })
                        },2000)
                    })
                } else {
                    this.setState({
                        formSuccess: false,
                        formError: true,
                    })
                }
            })
        } else {
            this.setState({
                formSuccess: false,
                formError: true
            })
        }
    }

    update = (element) => {        
        const newFormdata = update(element,this.state.formdata,'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        return (
            !this.state.valid ? null : 

            (<div className="container">
                <h1>Change passwords</h1>
                <form onSubmit={(event) => this.submitForm(event)}>

                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.update(element)}
                    />

                    <FormField
                        id={'passwordConfirm'}
                        formdata={this.state.formdata.passwordConfirm}
                        change={(element) => this.update(element)}
                    />      

                    {this.state.formSuccess ?
                        <div className="form_success">
                           Password is RESET. Redirect in a moment
                        </div>
                        :null
                    }
                    {this.state.formError ?
                        <div className="error_label">
                            {this.state.errorMsg}
                        </div>
                        : null
                    }
                    <button type="submit">
                        Reset password
                    </button>


                </form>
            </div>)
        )
    }
}

export default ChangPassword;
