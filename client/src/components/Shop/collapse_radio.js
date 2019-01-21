import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class CollapseRadio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checked: -1,
            value: 'female'
        };
    }
    
    
    handleClick(){
        this.setState(state => ({ open: !state.open }));
    }

    handleToggle (value,array) {
        // same value =, toggle,
        // different value, then change that value
        var {checked} = this.state;
        const {category} = this.props;
        if (value === checked) {
            checked = -1;
        } else {
            checked = value;
        }

        this.setState({
            checked: checked
        },()=>{
            this.props.handleFilters(array,category)
        })

    }

    renderList = () => (
        this.props.list.length > 0 ? 

        this.props.list.map((item) => 
            (
            <ListItem key={item._id} style={{padding:'10px 0'}}>
                <ListItemText primary={item.name}/>
                <ListItemSecondaryAction>
                    <Checkbox
                        color="primary"
                        onChange={this.handleToggle.bind(this,item._id,item.array)}
                        checked={this.state.checked === item._id}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            )
        )
        : null
    )

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        const {title} = this.props;
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem button onClick={this.handleClick.bind(this)}>
                        <ListItemText className="collapse_title" primary={title} />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            
            </div>
        )
    }
}

export default CollapseRadio;