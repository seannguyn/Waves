import React, { Component } from 'react'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


class CollapseCheckbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            checked: [],
        };
    }
    
    
    handleClick(){
        this.setState(state => ({ open: !state.open }));
    }

    handleToggle (value) {
        const { checked } = this.state;
        const { category } = this.props;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(value)
        } else{
            newChecked.splice(currentIndex,1)
        }

        this.setState({
            checked: newChecked
        },()=>{
            this.props.handleFilters(newChecked,category)
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
                        onChange={this.handleToggle.bind(this,item._id)}
                        checked={this.state.checked.indexOf(item._id) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            )
        )
        : null
    )

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

export default CollapseCheckbox;