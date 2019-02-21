import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getBrands, addBrand } from '../../../reduxActions/productActions'
import FormField from '../../Form/formfield';
import { update, generateData, isFormValid, resetFormData} from '../../Form/formActions';


class ManageBrand extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Brand name',
                    name: 'brand_input',
                    type: 'text',
                    placeholder: 'Enter the Brand'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
        }
    }

    componentDidMount () {
        this.props.dispatch(getBrands())
        .then((response) => {
            console.log(response);
        })
        .catch(error => console.log(error));
    }

    resetState() {
        const resetData = resetFormData(this.state.formdata);
        this.setState({
            formdata: resetData,
            formError: false
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
        

        const dataToSubmit = generateData(this.state.formdata, 'brands');
        const isValid = isFormValid(this.state.formdata, 'brands');
        if (isValid) {
            console.log("Submitting",dataToSubmit);
            this.props.dispatch(addBrand(dataToSubmit,this.props.products.brands.brandData))
            .then(response => {
                if (response.payload.success) {
                    console.log(response,"ADDED Brand");
                    this.resetState();
                } else {
                    this.setState({
                        formError: true
                    })
                }

                // make sure props have new brands
            })
            .catch(error => console.log(error))

        } else {
            this.setState({
                formError: true
            })
        }
        
    }

    updateForm = (element) => {
        const newFormData = update(element,this.state.formdata,'brands');
        this.setState({
            formdata: newFormData,
            formError: false,
        })
    }

    showCategories = () => (
        this.props.products.brands.brandData.map((item) => (
            <div key={item._id}>{item.name}</div>
        ))
    )

    render() {
                
        return (
            <div>
                <h1>ALL BRANDS</h1>
                {this.showCategories()}
                <br/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <FormField 
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element)=> this.updateForm(element)}
                    />
                    <button disabled={this.state.formdata.name.value.length === 0 } type="submit">Add Brand</button>
                </form>
                    
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrand);
