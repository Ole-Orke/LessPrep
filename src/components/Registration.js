import React, { Component } from 'react';
import { Button, Responsive, Container, Grid } from 'semantic-ui-react';

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
      marginRight: "10%",
      marginLeft: "10%",
      paddingTop: "2%",
      paddingLeft: "3%",
      paddingRight: "3%",
      paddingBottom: "3%",
    }
    return (
      <div className="container">
        {/* <Responsive as="div" maxWidth={670}>
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
          <Responsive as={Button.Group} fluid widths={3} >
            <Button onClick={() => this.register()} className="btn btn-light">
              Register
            </Button>
            <Button onClick={() => this.props.continueOffline()} className="btn btn-light">
              Continue Offline
            </Button>
            <Button onClick={() => this.props.goToLogin()} className="btn btn-light">
              Go to login
            </Button>
          </Responsive>
        </Responsive> */}

        <Responsive as="div" style={formContainer}>
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
          {/* <Responsive as={Button.Group} fluid widths={3} minWidth={723}> */}
          <Responsive as={Button.Group} fluid widths={3} minWidth={548}>
            <Button onClick={() => this.register()} className="btn btn-light">
              Register
            </Button>
            <Button onClick={() => this.props.continueOffline()} className="btn btn-light">
              Continue Offline
            </Button>
            <Button onClick={() => this.props.goToLogin()} className="btn btn-light">
              To Login
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
              <Button onClick={() => this.props.goToLogin()} className="btn btn-light">
                To Login
              </Button>
            </Grid.Column>
          </Responsive>
        </Responsive>

      </div>
    )
  }
}

export default Registration;
