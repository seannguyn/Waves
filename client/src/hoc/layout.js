import React, { Component } from 'react'
import Header from '../components/Header_Footer/Header'
import Footer from '../components/Header_Footer/Footer'
import {connect} from 'react-redux';
import {fetchInfo} from '../reduxActions/siteInfoAction';

class Layout extends Component {

  componentDidMount() {
    
    this.props.dispatch(fetchInfo())
    .then((response) => {
      
    })
    .catch(error => {
      alert("error site info");
    });
      
    
      
  }
  

  render() {
    console.log(this.props.siteInfo);
    return (
      <div>
        <Header/>
        <div className="page_container">
            {this.props.children}
        </div>
        <Footer siteInfo={this.props.siteInfo.siteInfo[0]}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    siteInfo: state.siteInfo
  }
}
export default connect(mapStateToProps)(Layout);
