import React, { Component } from 'react';
import Registration from "./Registration.js";
import Login from "./Login.js";
import { Dropdown, Icon, Button, Header, Container, Segment, Step, Image, Responsive } from "semantic-ui-react";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: false,
      displayRegistration: false,
      exampleRoles: ['teachers', 'writers', 'professors', 'researchers', 'tutors', 'historians'],
      rolesIndex: 0,
    }
  }

  componentDidMount() {
    // console.log(logo)
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
          <Segment id="landing-header" textAlign="center" basic>
            <Header as="a" className="header-text" onClick={()=>this.toLandingPage()} href="#">
              {/* <Image src={process.env.PUBLIC_URL + 'Images/LessPrep linear drop shadow.png'}></Image> */}
              <Image id="logo" src={require('../Images/LessPrep_Logo_extended.png')}></Image>

            </Header>
            <Header id="nav-buttons" floated="right">

            </Header>
          </Segment>
              {this.state.displayRegistration ?
                <div>
                {this.state.registering ? <Registration continueOffline={() => this.props.continueOffline()}  goToLogin={() => this.goToLogin()}/> : <Login login={(userId) => this.props.login(userId)} goToRegistration={() => this.goToRegistration()} />}
            </div>
            :
            <div>
              <Container className="rotating-roles" as="h1" textAlign="center">Made for {this.state.exampleRoles[this.state.rolesIndex]}</Container>

              <Container className="landing-page-description" textAlign="center">
                <Container as="h2" textAlign="center">Stop redoing your lesson plans</Container>
                <p>We hate redundancy. We know you do too. Automate your workflow with LessPrep</p>
              </Container>
              <Container as="h2" textAlign="center">How it works:</Container>
              <div className="how-it-works">
                <Step.Group size="small" fluid widths={4}>
                  <Step icon="file outline" title="Add Document"></Step>
                  <Step icon="crop" title="Select text"></Step>
                  <Step icon="edit" title="Insert / Edit Text in Table"></Step>
                  <Step icon="download" title="Output!" description="Flashcards, worksheets and more!"></Step>
                </Step.Group>
                <Segment textAlign="center" basic>
                  <Responsive as={Button.Group} minWidth={440}>
                    <Button basic size='huge' color='blue' floated="right" onClick={()=>this.goToLogin()}>Login</Button>
                    <Button basic size='huge' color='blue' floated="right" onClick={()=>this.goToRegistration()}>Register</Button>
                    <Button basic size='huge' color='blue' floated="right" onClick={()=>this.props.continueOffline()}>Try Offline</Button>
                  </Responsive>
                  <Responsive as={Dropdown} maxWidth={439} icon='align justify'>
                    <Dropdown.Menu vertical direction="left">
                      <Dropdown.Item onClick={()=>this.goToLogin()}>Login</Dropdown.Item>
                      <Dropdown.Item onClick={()=>this.goToRegistration()}>Register</Dropdown.Item>
                      <Dropdown.Item onClick={()=>this.props.continueOffline()}>Try Offline</Dropdown.Item>
                    </Dropdown.Menu>
                  </Responsive>

                </Segment>
                {/* <Container as="h2" textAlign="center">Interested? Then {<a href='#' onClick={()=>this.goToRegistration()}>sign up now!</a>}</Container> */}
            </div>
            </div>
        }
      </div>
    )
  }
}

export default LandingPage;
