import React, { Component } from 'react'
import UserLayout from '../../hoc/userLayout';
import FormField from '../Form/formfield';
import {update, generateData, isFormValid, populateUserInfo} from '../Form/formActions';
import {connect} from 'react-redux';
import {updateUserProfile} from '../../reduxActions/userActions';
class UpdateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formError: false,
            formSuccess:false,
            formdata:{
                firstName: {
                    element: 'input',
                    value: '',
                    config:{
                        name: 'firstName_input',
                        type: 'text',
                        placeholder: 'Enter your name'
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:''
                },
                lastName: {
                    element: 'input',
                    value: '',
                    config:{
                        name: 'lastName_input',
                        type: 'text',
                        placeholder: 'Enter your lastname'
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:''
                },
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

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'update_user');
        dataToSubmit._id = this.props.user.user._id;

        let formIsValid = isFormValid(this.state.formdata,'update_user')

        if(formIsValid){
            this.props.dispatch(updateUserProfile(dataToSubmit)).then((response)=>{
                if(response.payload.success){
                    this.setState({
                        formSuccess: true
                    },()=>{
                        setTimeout(()=>{
                            this.setState({
                                formSuccess: false
                            })
                        },2000)
                    })
                } else {
                    this.setState({
                        formSuccess: false
                    })
                }
            }) 
        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'update_user');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    componentDidMount() {
        const newFormData = populateUserInfo(this.state.formdata, this.props.user.user)
        this.setState({
            formdata: newFormData
        })
    }
    

    render() {
        return (
            <UserLayout>
                <div>
                    <form onSubmit={(event)=>  this.submitForm(event)}>
                        <h2>Personal information</h2>
                        <div className="form_block_two">
                            <div className="block">
                                <FormField
                                    id={'firstName'}
                                    formdata={this.state.formdata.firstName}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>
                            <div className="block">
                                <FormField
                                    id={'lastName'}
                                    formdata={this.state.formdata.lastName}
                                    change={(element) => this.updateForm(element)}
                                />
                            </div>
                        </div>
                        <div>
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div>
                            {
                                this.state.formSuccess ?
                                <div className="form_success">Success</div>
                                :null
                            }
                            {this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Update personal info
                            </button>
                        </div>

                    </form>
                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UpdateProfile);
