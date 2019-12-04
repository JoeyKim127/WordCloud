import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import fire from '../config/Fire'


class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ','
}
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
    return (
        <div className="col-md-6">
            <form>
                <div className="form-group">
                    <lable for="exampleInputEmail">Email Address</lable>
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" 
                    class="form-control"  id="exampleInputEmail"  aria-describeby="emailHelp"
                    placeholder="Enter Email" />
                    <small id="emailHelp" class="form-text text-muted">werwerwer</small>
                </div>

                <div className="form-group">
                <lable for="exampleInputPW">Password</lable>
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" 
                    class="form-control"  id="exampleInputPW"  aria-describeby="emailHelp"
                    placeholder="Enter Password" />
                </div>
                <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
                <button onClick={this.signup} style={{marginLeft:'25px'}} className="btn btn-success">Signup</button>
            </form>
            
        </div>
    );
}
}
export default Login;