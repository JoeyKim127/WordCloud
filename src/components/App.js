import React, {Component} from 'react';
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
        }
    }

    componentDidMount() {
        this.authListener();
    }


authListener() {
    fire.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
            this.setState({user});
            // localStorage.setItem('user',user.uid);
        } else {
            this.setState({ user:null });
            // localStorage.removeItem('user');
        }
    });
}
 
    render() {
    
        console.log("App: this.state.user",this.state.user);
        // console.log("App: this.state.user.email",this.state.user.email);
      
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
};
export default App;