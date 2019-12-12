import React, { Component } from 'react'
import fire from '../config/Fire'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";

import './Login.css';

const styles = theme => ({
    loginb: {
      display: "block",
      position: 'absolute',
      justifyContent: 'center',
      width: 150 ,
      position: 'center',
      margin: '0px auto',
      marginTop: '200px'
      
    },

    signupb: {
     
        display: "block",
        position: 'absolute',
        justifyContent: 'center',
        width: 150 ,
        position: 'center',
        margin: '0px auto'
      },
      
      wholeb: {
          float: 'center',
      }
  });


class Login extends Component {
    constructor(props) {
    super(props);
    this.login =  this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    // this.addUserToFireStorage = this.addUserToFireStorage.bind(this);
    this.state = {
        name: '',
        email: '',
        point: 0
}
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            // console.log("login-u",user)
            // console.log("login- u.user.",u.user)
        }).catch((error) => {
            console.log(error)
            alert(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            // console.log("signup-this.state.email",this.state.email)
            // firestorage안에 데이터 넣기
                e.preventDefault();
            const db = fire.firestore();
            db.settings({
                timestampsInSnapshots: true
            });
            const userRef = db.collection("users").add({
                name: this.state.name,
                email: this.state.email,
                point: 0
            });  
            console.log("signup-users",userRef);
            // console.log("Login: this.state.name",this.state.name)
            // console.log("Login: this.state.email",this.state.email)
                })
        .catch((error) => {
        console.log(error);
        alert(error);
        })
    }



// addUserToFireStorage(e) {
//        e.preventDefault();
//        const db = firebase.firestore();
//        db.settings({
//        timestampsInSnapshots: true
//          });
//     const userRef = db.collection("users").add({
    //     name: this.state.name,
    //     email: this.state.email,
    //     point: 0
// });  
//    };



    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

// login button toggle
    handleLoginToggle = () => this.setState({
        // 스위치 함수: dialog 상태를  true에서 false로 전환, false에서 true로 전환
        loginform: !this.state.loginform
    })

    // signup form toggle
     handleSignupToggle = () => this.setState({
        // 스위치 함수: dialog 상태를  true에서 false로 전환, false에서 true로 전환
        signupform: !this.state.signupform
    })




    render() {
        const { classes } = this.props;

    return (
        <div className={classes.wholeb}>
            
            <Button className={classes.loginb} onClick={this.handleLoginToggle} variant="outlined" color="primary" >Login</Button> 
            <Dialog open={this.state.loginform} onClose={this.handleLoginToggle} aria-labelledby="form-dialog-title">   
                <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Email Address"
                            label="Email Address"
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            type="email" 
                            name="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            type="password" 
                            name="password" 
                            id="exampleInputPW"  
                            placeholder="Enter Password"
                            label="Password"
                            fullWidth
                        />
                    </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={this.login} color="primary">Login</Button>
                <Button type="submit" onClick={this.handleLoginToggle} color="primary">close</Button>
            </DialogActions>      
    </Dialog>

&nbsp;

    <Button className={classes.signupb} onClick={this.handleSignupToggle} variant="outlined" color="primary" >Signup</Button> 
    <Dialog open={this.state.signupform} onClose={this.handleSignupToggle} aria-labelledby="form-dialog-title">
        <DialogTitle>Signup</DialogTitle>
            <DialogContent>
                 <TextField
                    autoFocus
                    margin="dense"
                    value={this.state.name} 
                    onChange={this.handleChange} 
                    type="name" 
                    name="name" 
                    id="exampleName"  
                    placeholder="Enter name"
                    label="Name"
                    fullWidth
                />

                <TextField
                    margin="dense"
                    value={this.state.email} 
                    onChange={this.handleChange} 
                    type="email" 
                    name="email"  
                    id="example  InputEmail"
                    placeholder="Enter Email"
                    label="E-mail"
                    fullWidth
                />   
                <TextField
                    margin="dense"
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    type="password" 
                    name="password" 
                    id="example  InputPW"
                    placeholder="Enter Password"
                    label="Password"
                    fullWidth
                />             
            </DialogContent>

            <DialogActions>
                <Button type="submit" onClick={this.signup} color="primary">Signup</Button>
                <Button type="submit" onClick={this.handleSignupToggle} color="primary">close</Button>
            </DialogActions>
      </Dialog>
         
    </div>
        );
    }
}

export default withStyles(styles)(Login);