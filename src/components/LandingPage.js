import React, { Component } from 'react';
import Registration from "./Registration.js";
import Login from "./Login.js";
import { Icon, Button, Header, Container, Segment, Step, Responsive } from "semantic-ui-react";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: false,
      displayRegistration: false,
      exampleRoles: ['teacher', 'writer', 'professor', 'researcher', 'tutor', 'historian'],
      rolesIndex: 0,
    }
  }

  componentDidMount() {
    let exampleRolesLooper = this.exampleRolesLooper.bind(this)
    var index = setInterval(exampleRolesLooper, 3500);
  }

  goToLogin() {
    // let dispReg = this.state.displayRegistration;
    this.setState({
      displayRegistration: true,
      registering: false
    });
    console.log(this.state)
  }

  goToRegistration() {
    console.log("go to registration")
    let dispReg = this.state.displayRegistration;
    this.setState({
      displayRegistration: true,
      registering: true
    });
    console.log(this.state);
  }

  toLandingPage() {
    this.setState({
      displayRegistration: false
    })
  }

  exampleRolesLooper() {
    if (this.state.rolesIndex < this.state.exampleRoles.length - 1) {
      this.setState({rolesIndex: this.state.rolesIndex + 1})

    } else {
      this.setState({rolesIndex: 0})
    }
  }

  render() {
    return (
      <div className="landing-page">
        <Segment clearing id="landing-header">
          <Header as="a" className="header-text" floated="left" onClick={()=>this.toLandingPage()} href="#">
            LessPrep
          </Header>
          <Header id="nav-buttons" floated="right">
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
          </div>
          :
          <div>


            <Container className="rotating-roles" as="h1" textAlign="center">Are you a {this.state.exampleRoles[this.state.rolesIndex]}?</Container>

            <Container className="landing-page-description">
              <Container as="h2" textAlign="center">Stop redoing your lesson plans</Container>
              <p>We hate redundancy. We know you do too. LessPrep is here to take the repetition out of lesson planning.
                Never re-write another worksheet, study guide or lesson plan again. Simply upload a picture, select the
                text you need, and output it to a variety of formats. Simple as that.</p>
              </Container>
              <Container as="h2" textAlign="center">How it works:</Container>
              <div className="how-it-works">
                <Step.Group size="small" fluid widths={4}>
                  <Step icon="file outline" title="Add Document"></Step>
                  <Step icon="crop" title="Select text"></Step>
                  <Step icon="edit" title="Insert / Edit Text in Table"></Step>
                  <Step icon="download" title="Output!" description="Flashcards, worksheets and more!"></Step>
                </Step.Group>
                <Container as="h2" textAlign="center">Interested? Then {<a href='#' onClick={()=>this.goToRegistration()}>sign up now!</a>}</Container>
              </div>
            </div>
            </div>
        }
      </div>
    )
  }

  export default LandingPage;
