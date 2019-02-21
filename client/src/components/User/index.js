import UserLayout from '../../hoc/userLayout'
import MyButton from '../Button/mybutton'
import React, { Component } from 'react'
import {connect} from 'react-redux';
import HistoryBlock from './history_block'
class UserDashboard extends Component {
    render() {
        return (
            <UserLayout>
                <div>
                    <div className="user_nfo_panel">
                        <h1>User information</h1>
                        <div>
                            <span>{this.props.user.user.firstName}</span>
                            <span>{this.props.user.user.lastName}</span>
                            <span>{this.props.user.user.email}</span>
                        </div>
                        <MyButton
                            type="default"
                            title="Edit account info"
                            linkTo="/user/user_profile"
                        />
                    </div>

                    <div className="user_nfo_panel">
                        <h1>History purchases</h1>
                        {this.props.user.success && this.props.user.user.history.length > 0 ? 
                            <div className="user_product_block_wrapper">
                                <HistoryBlock products={this.props.user.user.history}/>
                            </div>  
                            : 
                            null
                        }
                                  
                    </div>
                    
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

export default connect(mapStateToProps)(UserDashboard);

