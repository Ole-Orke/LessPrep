import React, { Component } from 'react';
import Registration from "./Registration.js";
import Login from "./Login.js";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: true
    }
  }

  goToLogin() {
    this.setState({
      registering: false
    });
  }

  goToRegistration() {
    console.log("go to registration")
    this.setState({
      registering: true
    });
  }

  render() {
    return (
      <div>
        {this.state.registering ? <Registration continueOffline={() => this.props.continueOffline()}  goToLogin={() => this.goToLogin()}/> : <Login login={() => this.props.login()} goToRegistration={() => this.goToRegistration()} />}
      </div>
    )
  }
}

export default LandingPage;
