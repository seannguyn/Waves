import React, { Component } from 'react'
import FormField from '../../Form/formfield';
import {connect} from 'react-redux'
import { update, generateData, isFormValid, resetFormData} from '../../Form/formActions';
import { getWoods, addWood } from '../../../reduxActions/productActions';

class ManageWoods extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Wood name',
                    name: 'brand_input',
                    type: 'text',
                    placeholder: 'Enter the Wood'
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

    componentDidMount() {
        this.props.dispatch(getWoods())
        .then((response) => {
            console.log(response)
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

    updateForm = (element) => {
        const newFormData = update(element,this.state.formdata,'woods');
        this.setState({
            formdata: newFormData,
            formError: false,
        })
    }

    submitWood(e) {
        e.preventDefault();

        const dataToSubmit = generateData(this.state.formdata, 'woods');
        const isValid = isFormValid(this.state.formdata, 'woods');
        if (isValid) {
            console.log("Submitting",dataToSubmit);
            this.props.dispatch(addWood(dataToSubmit,this.props.products.woods.woodData))
            .then(response => {
                if (response.payload.success) {
                    console.log(response,"ADDED Wood");
                    this.resetState();
                } else {
                    this.setState({
                        formError: true
                    })
                }
            })
            .catch(error => console.log(error))

        } else {
            this.setState({
                formError: true
            })
        }
    }

    showWoods = () => (
        this.props.products.woods.woodData.map((item) => (
            <div key={item._id}>{item.name}</div>
        ))
    )

    render() {
        return (
            <div>
                <h1>ALL WOODS</h1>
                {this.showWoods()}
                <br/>
                <form onSubmit={this.submitWood.bind(this)}>
                    <FormField 
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element)=> this.updateForm(element)}
                    />
                    <button disabled={this.state.formdata.name.value.length === 0 } type="submit">Add Wood</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageWoods);