import React, { Component } from 'react'
import PageTop from './page_top';
import {connect} from 'react-redux';
import {getWoods, getBrands, getProductByFilter} from '../../reduxActions/productActions';
import CollapseCheckbox from './collapse_checkbox';
import CollapseRadio from './collapse_radio';
import {frets,price} from '../../constant/constant';
import LoadMore from './loadmore';
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

    loadMore() {
        const {limit, skip} = this.state;
        const {filterProduct} = this.props.products;
        let newSKip = skip + limit;

        this.setState({
           skip: newSKip 
        },() => {
            this.props.dispatch(getProductByFilter(this.state,filterProduct.products));
        })

        
        // newSkip = this.state.skip + this.state.limit
        // setState newSkip
        // dispatch filter product
        // go to redux, concat old state with new state

        console.log("loading more item");
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
                            <div className="shop_options">
                                <div className="shop_grid clear">
                                    
                                </div>
                            </div>

                            <LoadMore
                                products={this.props.products}
                                configuration = {{
                                    skip: this.state.skip,
                                    limit: this.state.limit,
                                    grid: this.state.grid
                                }}
                                loadMore={this.loadMore.bind(this)}
                            />
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
