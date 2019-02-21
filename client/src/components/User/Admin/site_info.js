import React, { Component } from 'react'
import UserLayout from '../../../hoc/userLayout';
import FormField from '../../Form/formfield';
import {update, generateData, isFormValid, populateUserInfo} from '../../Form/formActions';
import {connect} from 'react-redux';
import {fetchInfo, editInfo} from '../../../reduxActions/siteInfoAction';

class SiteInfo extends Component {

    state = {
        loading: true,
        formError: false,
        formSuccess:false,
        formdata:{
            address: {
                element: 'input',
                value: '',
                config:{
                    label:'Adresss',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },  
            workingHours: {
                element: 'input',
                value: '',
                config:{
                    label:'Working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the site working hours'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },  
            phone: {
                element: 'input',
                value: '',
                config:{
                    label:'Phone number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the phone number'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },  
            email: {
                element: 'input',
                value: '',
                config:{
                    label:'Shop email',
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
                validationMessage:'',
                showlabel: true
            },  
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'update_user');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'site_info');
        let formIsValid = isFormValid(this.state.formdata,'site_info')

        if(formIsValid){
            console.log(dataToSubmit);
            this.props.dispatch(editInfo(dataToSubmit))
            .then((response) => {
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
            .catch(error => {
                this.setState({formError: true})
                console.log(error);
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchInfo())

        .then((response) => {
            const newFormdata = populateUserInfo(this.state.formdata, response.payload.siteInfo[0]);
            this.setState({
                loading: false,
                formdata: newFormdata
            })
        })
    }

    render() {
        const {loading} = this.state;
        return (
            <UserLayout>
                {loading ? null : 
                    <div>
                        <form onSubmit={(event)=>  this.submitForm(event)}>
                            <h1>Site info</h1>
                            <FormField
                                id={'address'}
                                formdata={this.state.formdata.address}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'workingHours'}
                                formdata={this.state.formdata.workingHours}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'phone'}
                                formdata={this.state.formdata.phone}
                                change={(element) => this.updateForm(element)}
                            />

                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />

                            <div>
                                {
                                    this.state.formSuccess ? 
                                    <div className="form_success">
                                        Success
                                    </div>
                                    :null
                                }
                                {this.state.formError ?
                                    <div className="error_label">
                                        Please check your data
                                                </div>
                                    : null}
                                <button onClick={(event) => this.submitForm(event)}>
                                    Update
                                </button>
                            </div>

                        </form>
                    </div>
                }
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        siteInfo: state.siteInfo
    }
}

export default connect(mapStateToProps)(SiteInfo);
