import React, { Component } from 'react'
import UserLayout from '../../../hoc/userLayout'
import { connect } from 'react-redux';
import { update, generateData, isFormValid, populateField } from '../../Form/formActions'
import FormField from '../../Form/formfield';
import {getBrands,getWoods,addProduct} from '../../../reduxActions/productActions';
import FileUpload from '../../Form/fileUpload'

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formError:false,
            formSuccess:false,
            formdata:{
                name: {
                    element: 'input',
                    value: '',
                    config:{
                        label: 'Product name',
                        name: 'name_input',
                        type: 'text',
                        placeholder: 'Enter your name'
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                description: {
                    element: 'textarea',
                    value: '',
                    config:{
                        label: 'Product description',
                        name: 'description_input',
                        type: 'text',
                        placeholder: 'Enter your description'
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                price: {
                    element: 'input',
                    value: '',
                    config:{
                        label: 'Product price',
                        name: 'price_input',
                        type: 'number',
                        placeholder: 'Enter your price'
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                brand: {
                    element: 'select',
                    value: '',
                    config:{
                        label: 'Product Brand',
                        name: 'brands_input',
                        options:[]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                shipping: {
                    element: 'select',
                    value: '',
                    config:{
                        label: 'Shipping',
                        name: 'shipping_input',
                        options:[
                            {key:true,value:'Yes'},
                            {key:false,value:'No'},
                        ]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                available: {
                    element: 'select',
                    value: '',
                    config:{
                        label: 'Available, in stock',
                        name: 'available_input',
                        options:[
                            {key:true,value:'Yes'},
                            {key:false,value:'No'},
                        ]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                wood: {
                    element: 'select',
                    value: '',
                    config:{
                        label: 'Wood material',
                        name: 'wood_input',
                        options:[]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                frets: {
                    element: 'select',
                    value: '',
                    config:{
                        label: 'Frets',
                        name: 'frets_input',
                        options:[
                            {key:20,value:20},
                            {key:21,value:21},
                            {key:22,value:22},
                            {key:24,value:24}
                        ]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                publish: {
                    element: 'select',
                    value: '',
                    config:{
                        label: 'Publish',
                        name: 'publish_input',
                        options:[
                            {key:true,value:'Public'},
                            {key:false,value:'Hidden'},
                        ]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage:'',
                    showlabel: true
                },
                images:{
                    value:[],
                    validation:{
                        required: false
                    },
                    valid: true,
                    touched: false,
                    validationMessage:'',
                    showlabel: false
                }
            }
        }
    }

    resetFields() {
        console.log('successful');
    }

    submit(e) {
        e.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata,'register');
        let formIsValid = isFormValid(this.state.formdata,'register')
        // reset fields,
        // clear redux state
        if(formIsValid){
            console.log("about to submit VALID",dataToSubmit);
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
                    this.resetFields();
                } else {
                    this.setState({
                        formError: true
                    })
                }
                
            });
        } else {
            console.log("about to submit INVALID");
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'products');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    updateState(formData) {
        this.setState({
            formdata: formData
        })
    }

    componentDidMount() {
        this.props.dispatch(getBrands())
                    .then((res) => {
                        const newFormData = populateField(this.state.formdata,this.props.products.brands.brandData,'brand');
                        this.updateState(newFormData);
                    });

        this.props.dispatch(getWoods())
        .then((res) => {
            const newFormData = populateField(this.state.formdata,this.props.products.woods.woodData,'wood');
            this.updateState(newFormData);
        });
    }

    handleImageUpload(imagesFiles) {
        console.log(imagesFiles);
    }

    render() {
        return (
            <UserLayout>
                <h1>Add product</h1>
                <form onSubmit={this.submit.bind(this)}>

                    <FileUpload handleImageUpload={this.handleImageUpload.bind(this)}/>

                    <FormField
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'description'}
                        formdata={this.state.formdata.description}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'price'}
                        formdata={this.state.formdata.price}
                        change={(element) => this.updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormField
                        id={'brand'}
                        formdata={this.state.formdata.brand}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'shipping'}
                        formdata={this.state.formdata.shipping}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'available'}
                        formdata={this.state.formdata.available}
                        change={(element) => this.updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormField
                        id={'wood'}
                        formdata={this.state.formdata.wood}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'frets'}
                        formdata={this.state.formdata.frets}
                        change={(element) => this.updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormField
                        id={'publish'}
                        formdata={this.state.formdata.publish}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.state.formSuccess ?
                            <div className="form_success">
                                Success
                            </div>
                        :null}
                    
                    {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                        </div>
                            : null}

                    <button type="submit">
                        Add product
                    </button>
                </form>
            </UserLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);
