import React, {Component} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home';
import Text from './Text';
import Words from './Words';
import fire from '../config/Fire';
import Login from './Login';





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

// state = {
//     userdata: this.state.user
// }

    render() {
        console.log("App: this.state.user",this.state.user);
    return (
       <Router>
            <AppShell>
                <div>
  
            {this.state.user ?  <>
                     <Route exact  path="/" component={Home} />
                    <Route exact  path="/text" component={Text} />
                    <Route exact  path="/words" component={Words} /> </>: (<Login />)}
                </div>
            </AppShell>
           
      </Router>
    );
};
};
export default App;