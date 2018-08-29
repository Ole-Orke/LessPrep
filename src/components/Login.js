import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  onEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  login() {
    fetch('/api/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      })
    })
    .then((resp)=> {
      return resp.json();
    })
    .then((resJson) => {
      console.log(resJson);
      if (resJson.success) {
        console.log("Login successful");
        this.props.login();
      }
      else {
        console.log("Login failed");
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    const formContainer = {
      marginTop: "5%",
      marginRight: "30%",
      marginLeft: "30%",
      paddingTop: "2%",
      paddingLeft: "3%",
      paddingRight: "3%",
      paddingBottom: "3%",
      backgroundColor: "#f2f2f2",
      borderRadius: "5px",
    }
    return (
      <div className="container-fluid">
        <div style={formContainer}>
          <div style={{textAlign: "center"}}>
            <h3>
              Login
            </h3>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(event) => this.onEmailChange(event)} value={this.state.email} placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(event) => this.onPasswordChange(event)} value={this.state.password} placeholder="Password" />
          </div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <button onClick={() => this.login()} className="btn btn-light">
              Login
            </button>
            <button onClick={() => this.props.goToRegistration()} className="btn btn-light">
              Go to registration
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
