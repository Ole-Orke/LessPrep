import React, { Component } from 'react';
import Registration from "./Registration.js";
import Login from "./Login.js";
import { Button, Header, Container, Segment } from "semantic-ui-react";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: false,
      displayRegistration: false,
    }
  }

  goToLogin() {
    this.setState({
      displayRegistration: true,
      registering: false
    });
  }

  goToRegistration() {
    console.log("go to registration")
    this.setState({
      displayRegistration: true,
      registering: true
    });
  }

  render() {
    return (
      <div className="landing-page">
          <Segment clearing id="landing-header">
            <Header className="header-text" floated="left" >
              LessPrep
            </Header>
            <Header id="nav-buttons">
              <Button.Group floated="right">
                <Button floated="right" onClick={()=>this.goToLogin()}>Login</Button>
                <Button floated="right" onClick={()=>this.goToRegistration()}>Register</Button>
                <Button floated="right" onClick={()=>this.props.continueOffline()}>Try Offline</Button>
              </Button.Group>
            </Header>

          </Segment>
          {this.state.displayRegistration ?
            <div>
            {this.state.registering ? <Registration continueOffline={() => this.props.continueOffline()}  goToLogin={() => this.goToLogin()}/> : <Login login={() => this.props.login()} goToRegistration={() => this.goToRegistration()} />}
          </div> :
          <div></div>
         }
      </div>
    )
  }
}

export default LandingPage;
