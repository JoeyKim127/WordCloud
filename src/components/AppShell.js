

import HomeIcon from '@material-ui/icons/Home';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonIcon from '@material-ui/icons/Person';

import React, { Component } from 'react'

import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import  {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import  MenuItem  from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 'auto',
    },
}

class AppShell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
    }
    handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})
    render() {
        const { classes } = this.props; 
       
        return (
           <div>
            <div className={classes.root}>
                <AppBar position="static" >
                    <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                        <MenuIcon />
                      
                    </IconButton>
                </AppBar>
                <Drawer open={this.state.toggle} >
                    <MenuItem onClick={this.handleDrawerToggle}>
                        <Link component={RouterLink} to="/">Home 화면<HomeIcon /></Link>
                    </MenuItem>
                 
                    <MenuItem onClick={this.handleDrawerToggle}>
                        <Link component={RouterLink} to="/text">TEXT 화면<StorefrontIcon /></Link>
                    </MenuItem>
                 
                    <MenuItem onClick={this.handleDrawerToggle}>
                        <Link component={RouterLink} to="/words">WORDS 화면<PersonIcon /></Link>
                    </MenuItem>
                </Drawer>
            </div>
            <div id="content" style={{margin: 'auto', marginTop: '20px'}}>
                {React.cloneElement(this.props.children)}
            </div>
          </div>
        )
    }
}


export default withStyles(styles)(AppShell);