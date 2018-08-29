import React, { Component } from 'react';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  register() {
    if (this.state.email && this.state.password) {
      fetch('/api/user/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      .then((res)=> (res.json()))
      .then((resJson) => {
        console.log(resJson);
        if (resJson.success) {
          console.log("Registration successful");
          this.props.goToLogin();
        }
        else {
          console.log("Registration failed");
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      alert("Email and password are required!");
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
              Register
            </h3>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(event) => this.onEmailChange(event)} value={this.state.email} placeholder="Enter email" required/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(event) => this.onPasswordChange(event)} value={this.state.password} placeholder="Password" required/>
          </div>
          <div style={{display: "inline-block"}}>
            <button onClick={() => this.register()} className="btn btn-light">
              Register
            </button>
            <button onClick={() => this.props.continueOffline()} className="btn btn-light">
              Continue Offline
            </button>
            <button onClick={() => this.props.goToLogin()} className="btn btn-light">
              Go to login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;
