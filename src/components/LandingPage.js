import React, { Component } from 'react';
import Registration from "./Registration.js";
import Login from "./Login.js";
import { Dropdown, Icon, Button, Header, Container, Segment, Step, Image, Responsive, Grid, Divider } from "semantic-ui-react";

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
              <Responsive minWidth={1080}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Container className="rotating-roles" as="h1" textAlign="center">Tools for {this.state.exampleRoles[this.state.rolesIndex]}</Container>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={5}>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container as="h1" textAlign="center">
                        Transcribe text {<br/>}
                        <Icon name="file text"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container as="h1" textAlign="center">
                        Make flashcards {<br/>}
                        <Icon name="table"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={5}>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Easily extract text from your documents in seconds. Just select the text, copy to clipboard and paste anywhere you want.
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Create flashcards using our flashcard editor, then export to PDF.
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={5}>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container as="h1" textAlign="center">
                        Easy upload {<br/>}
                        <Icon name="upload"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container as="h1" textAlign="center">
                        Save your work {<br/>}
                        <Icon name="save"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={5}>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Drag and drop files directly or upload from your phone!
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={4}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Store your data and pick up where you left off.
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Responsive>

              <Responsive maxWidth={1079}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Container className="rotating-roles" as="h1" textAlign="center">Tools for {this.state.exampleRoles[this.state.rolesIndex]}</Container>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container as="h1" textAlign="center">
                        Transcribe text {<br/>}
                        <Icon name="file text"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Easily extract text from your documents in seconds. Just select the text, copy to clipboard and paste anywhere you want.
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container as="h1" textAlign="center">
                        Make Flashcards {<br/>}
                        <Icon name="table"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Create flashcards using our flashcard editor, then export to PDF.
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container as="h1" textAlign="center">
                        Easy Upload {<br/>}
                        <Icon name="upload"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Drag and drop files directly or upload from your phone!
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container as="h1" textAlign="center">
                        Save your work {<br/>}
                        <Icon name="save"></Icon>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                      <Container className="descriptionText" as="p" textAlign="center">
                        Store your data and pick up where you left off.
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                  </Grid.Row>



                </Grid>
              </Responsive>
              <Divider horizontal><h1>The basics</h1></Divider>
              {/*}<Container as="h1" textAlign="center">How it works:</Container>{*/}
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
                  <Responsive as={Button.Group} vertical maxWidth={439} icon='align justify'>
                    <Button basic size='huge' color='blue' floated="right" onClick={()=>this.goToLogin()}>Login</Button>
                    <Button basic size='huge' color='blue' floated="right" onClick={()=>this.goToRegistration()}>Register</Button>
                    <Button basic size='huge' color='blue' floated="right" onClick={()=>this.props.continueOffline()}>Try Offline</Button>
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
