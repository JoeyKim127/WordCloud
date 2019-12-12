import React, {Component, useState, useEffect} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home';
import Profile from './Profile';
import Words from './Words';
import fire from '../config/Fire';
import Login from './Login';
import Shop from './Shop';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userlists: {},
        }
    }

    componentDidMount() {
        this.authListener();
       
        // this.showUserInfo();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) { 
                this.setState({user});  
                
                console.log("App:user",user)
            } else {
                this.setState({ user:null });
            }
           
        });
    }

        // showUserInfo() {
        //              fire
        //             .firestore()
        //             .collection("users")  
        //                 .where("email", "=="," eeee.gmail.com")
        //                 .get()
        //                 .then(snapshot => { 
        //                     const userlists = []
        //                     snapshot.forEach (doc => {
        //                         const data = doc.data()
        //                         userlists.push(data)
        //                     })
        //                     this.setState ({ userlists: userlists})
        //                     //  console.log("App: userlists",this.state.user.email)
        //                     // console.log("App: show user info",snapshot.docs)
        //                       }) 
        //                           console.log("App: this.state.user.email",this.state.user.email)
        //                     }

      
    //   getUser = () => {
    //     const email = this.state.user
    //     // showUserInfo(email);
    //     console.log("App: email:",email)
    //   }

    render() {
        // console.log("user",user)
      
    return (
        <Router>
             <AppShell>
                <div>
  
            {this.state.user ?  <>
                    <Route exact  path="/" render={(props) => <Home {...props} loggedInUser={this.state.user} />}/> 
                    <Route exact  path="/profile" render={(props) => <Profile {...props} loggedInUser={this.state.user} />}/>
                    <Route exact  path="/shop" component={Shop} /> </>: (<Login />)}
                </div>

            </AppShell>
        </Router>
        );
    };
}
export default App;