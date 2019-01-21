import React, { Component } from 'react'
import PageTop from './page_top';
import {connect} from 'react-redux';
import {getWoods, getBrands, getProductByFilter} from '../../reduxActions/productActions';
import CollapseCheckbox from './collapse_checkbox';
import CollapseRadio from './collapse_radio';
import {frets,price} from '../../constant/constant';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: '',
            limit: 6,
            skip: 0,
            filter: {
                wood:[],
                brand:[],
                frets: [],
                price: [],
            }
        }
    }

    componentDidMount(){
        this.props.dispatch(getWoods());
        this.props.dispatch(getBrands());
        this.props.dispatch(getProductByFilter(this.state));
    }
    
    handleFilters(returnFilter,category) {
        const {filter} = this.state;
        const newFilter = {...filter};
        newFilter[category] = returnFilter;

        

        this.setState({
            skip: 0,
            filter: newFilter
        },() => {
            this.props.dispatch(getProductByFilter(this.state));
        })
        
    }

    render() {
        const {woods, brands} = this.props.products;

        return (
            <div>
                <PageTop title="Browse Product"/>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                list={brands.brandData}
                                handleFilters={this.handleFilters.bind(this)}
                                category="brand"
                             />
                            <CollapseCheckbox 
                                initState={true}
                                title="Woods"
                                list={woods.woodData}
                                handleFilters={this.handleFilters.bind(this)}
                                category="wood"
                             />
                             <CollapseCheckbox 
                                initState={true}
                                title="Frets"
                                list={frets}
                                handleFilters={this.handleFilters.bind(this)}
                                category="frets"
                             />
                             <CollapseRadio
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={this.handleFilters.bind(this)}
                                category="price"
                             />
                        </div>

                        <div className="right">
                            right
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    }
}

export default connect(mapStateToProps)(Shop);
