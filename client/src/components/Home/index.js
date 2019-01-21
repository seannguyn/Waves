import React, { Component } from 'react'
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import { connect } from 'react-redux';
import { getProductByArrival, getProductBySell } from '../../reduxActions/productActions';
import CardBlock from '../Card/card_block';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    
  }

  componentDidMount(){
    this.props.dispatch(getProductByArrival());
    this.props.dispatch(getProductBySell()); 
  }

  render() {    
    return (
      <div>
        <HomeSlider/>
        <CardBlock title="New Arrival" list={this.props.products.byArrival}/>
        <HomePromotion/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

// Home.defaultProps = {
//   products: {
//     byArrival: [],
//     bySell: [],
//     success: false
//   }
// };

export default connect(mapStateToProps)(Home);
