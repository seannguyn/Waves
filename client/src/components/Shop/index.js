import React, { Component } from 'react'
import PageTop from './page_top';
import {connect} from 'react-redux';
import {getWoods, getBrands} from '../../reduxActions/productActions';
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
                woods:[],
                brands:[],
                frets: [],
                price: [],
            }
        }
    }

    componentDidMount(){
        this.props.dispatch(getWoods())
        this.props.dispatch(getBrands())
    }
    
    handleFilters(returnFilter,category) {
        const {filter} = this.state;
        const newFilter = {...filter};
        newFilter[category] = returnFilter;
        this.setState({
            filter: newFilter
        },() => {
            console.log(this.state.filter);
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
                                category="brands"
                             />
                            <CollapseCheckbox 
                                initState={true}
                                title="Woods"
                                list={woods.woodData}
                                handleFilters={this.handleFilters.bind(this)}
                                category="woods"
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
