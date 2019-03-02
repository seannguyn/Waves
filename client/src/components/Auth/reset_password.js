import React, { Component } from 'react'
import FormField from '../Form/formfield';
import {isFormValid, generateData, update} from '../Form/formActions'
import axios from 'axios';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            }
        }
    }

    async submitForm(e) {
        e.preventDefault();
        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login')
        
        if(formIsValid){
            const request = await axios.post('/api/user/resetPasswordToken',dataToSubmit);
            if (request.data.success) {
                this.setState({
                    formSuccess: true,
                    formError: false
                })
            } else {
                console.log(request.data);
                this.setState({
                    formSuccess: false,
                    formError: true
                })
            }
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
            <div className="container">
                <h1>Rest passwords</h1>
                <form onSubmit={(event) => this.submitForm(event)}>

                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.update(element)}
                    />

                    {this.state.formSuccess ?
                        <div className="form_success">
                           Done, check your email
                        </div>
                        :null
                    }
                    {this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                        : null
                    }
                    <button type="submit">
                        Send email to reset password
                    </button>


                </form>
            </div>
        )
    }
}

export default ResetPassword;
