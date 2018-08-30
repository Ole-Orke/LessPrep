import React, { Component } from 'react';
import { Button, Responsive, Grid } from 'semantic-ui-react'

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
      marginRight: "20%",
      marginLeft: "20%",
      paddingTop: "2%",
      paddingLeft: "3%",
      paddingRight: "3%",
      paddingBottom: "3%",
    }
    return (
      <Responsive as='div' className="container">
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
          <Responsive as={Button.Group} fluid widths={2} minWidth={548}>
            <Button onClick={() => this.login()} className="btn btn-light">
              Login
            </Button>
            <Button onClick={() => this.props.goToRegistration()} className="btn btn-light">
              To Registration
            </Button>
          </Responsive>

          <Responsive as={Grid}  maxWidth={547} centered>
            <Grid.Column as={Button.Group} vertical size='small'>
              <Button onClick={() => this.register()} className="btn btn-light" >
                Register
              </Button>
              <Button onClick={() => this.props.continueOffline()} className="btn btn-light">
                Continue Offline
              </Button>
            </Grid.Column>
          </Responsive>

        </div>
      </Responsive>
    )
  }
}

export default Login;
