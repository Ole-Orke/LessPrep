import React, { Component } from 'react';
import ContentTable from "./components/ContentTable.js";
import DocumentDisplay from "./components/DocumentDisplay.js";
import ExportBar from "./components/ExportBar.js";
import LandingPage from "./components/LandingPage.js";
import { Image, Header, Segment, Button, Dropdown, Grid, Responsive, Icon } from "semantic-ui-react";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputText: "",
      tableData: [],
      sessionStarted: false,
      loggedIn: false,
    }
  }

  componentDidMount() {
    console.log(this.state.sessionStarted, this.state.loggedIn);
  }

  sendTable = (output) => {
    this.setState({
      tableData: output
    });
  }

  sendOutputText = (output) => {
    console.log("sendOutputText called!\n", output);
    this.setState({
      outputText: output
    });
  }

  login(){
    this.setState({
      loggedIn: true,
      sessionStarted: true
    });
  }

  continueOffline() {
    this.setState({
      sessionStarted: true
    });
  }

  saveTable() {

  }

  logout() {
    fetch('/api/user/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      this.setState({
        loggedIn: false,
        sessionStarted: false
      })
    });
  }

  render() {
    const headerStyle = {
      height: "3%",
      backgroundColor: "#f2f2f2",
      margin: "0",
      padding: '0',
    }
    console.log(this.state.sessionStarted);
    return (
      <div className="Window">

        {this.state.sessionStarted ?
          <div>
            {/* <Grid className="App" style={{margin: 0}}>
              <Grid.Column style={headerStyle} clearing>
                <Segment as={Segment.Group} compact horizontal floated="left" basic>

                  <Header style={{margin: 0, padding: 0, fontSize: "2.5em"}} className="App-title">
                    LessPrep
                  </Header>
                  <Dropdown style={{fontSize: "2.5em"}} icon="align justify">
                    <Dropdown.Menu>
                      <Dropdown.Item text='New' />
                      <Dropdown.Item text='Open...' description='ctrl + o' />
                      <Dropdown.Item text='Save as...' description='ctrl + s' />
                      <Dropdown.Item text='Rename' description='ctrl + r' />
                      <Dropdown.Item text='Make a copy' />
                      <Dropdown.Item icon='folder' text='Move to folder' />
                      <Dropdown.Item icon='trash' text='Move to trash' />
                      <Dropdown.Divider />
                      <Dropdown.Item text='Download As...' />
                      <Dropdown.Item text='Publish To Web' />
                      <Dropdown.Item text='E-mail Collaborators' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Segment>
                <Grid.Column as={Button} floated="right" onClick={() => this.logout()}>Logout</Grid.Column>
              </Grid.Column>
            </Grid> */}
            <Responsive as={Segment} style={{padding: 0, margin: 0}} minWidth={1170}>
              <Grid className="App" style={{margin: 0}} verticalAlign="bottom">
                <Grid.Row>
                  <Grid.Column width={2}>

                      <Header style={{fontSize: "2.5em"}} className="App-title">
                        <Image src={require('/Users/khalidwilliams/LessPrep/src/Images/LessPrep linear drop shadow.png')}></Image>
                      </Header>
                    </Grid.Column>
                    <Grid.Column width={1}>
                      <Icon as={Dropdown} style={{fontSize: "2em"}} icon="align justify" size='mini'>
                        <Dropdown.Menu>
                          <Dropdown.Item text='New' />
                          <Dropdown.Item text='Open...' description='ctrl + o' />
                          <Dropdown.Item text='Save as...' description='ctrl + s' />
                          <Dropdown.Item text='Rename' description='ctrl + r' />
                          <Dropdown.Item text='Make a copy' />
                          <Dropdown.Item icon='folder' text='Move to folder' />
                          <Dropdown.Item icon='trash' text='Move to trash' />
                          <Dropdown.Divider />
                          <Dropdown.Item text='Download As...' />
                          <Dropdown.Item text='Publish To Web' />
                          <Dropdown.Item text='E-mail Collaborators' />
                        </Dropdown.Menu>
                      </Icon>
                  </Grid.Column>
                  {/* <Grid.Column as={Button} floated="right" onClick={() => this.logout()} width={1} centered>
                    Logout
                  </Grid.Column> */}
                  <Button as={Grid.Column} floated="right" onClick={() => this.logout()} width={1}>
                    Logout
                  </Button>
                </Grid.Row>
              </Grid>
            </Responsive>

            <Responsive as={Segment} style={{padding: 0, margin: 0}} maxWidth={1169}>
              <Grid className="App" style={{margin: 0}} verticalAlign="bottom">
                <Grid.Row>
                  <Grid.Column width={4} style={{display: 'inline'}}>

                      <Header style={{fontSize: "2.5em"}} className="App-title">
                        <Image src={require('./Images/LessPrep linear drop shadow.png')}></Image>
                      </Header>

                      <Dropdown style={{fontSize: "2em"}} icon="align justify">
                        <Dropdown.Menu>
                          <Dropdown.Item text='New' />
                          <Dropdown.Item text='Open...' description='ctrl + o' />
                          <Dropdown.Item text='Save as...' description='ctrl + s'/>
                          <Dropdown.Item text='Rename' description='ctrl + r' />
                          <Dropdown.Item text='Make a copy' />
                          <Dropdown.Item icon='folder' text='Move to folder' />
                          <Dropdown.Item icon='trash' text='Move to trash' />
                          <Dropdown.Divider />
                          <Dropdown.Item text='Download As...' />
                          <Dropdown.Item text='Publish To Web' />
                          <Dropdown.Item text='E-mail Collaborators' />
                        </Dropdown.Menu>
                      </Dropdown>
                  </Grid.Column>
                  {/* <Grid.Column as={Button} floated="right" onClick={() => this.logout()} width={1} centered>
                    Logout
                  </Grid.Column> */}
                  <Button as={Grid.Column} floated="right" onClick={() => this.logout()} width={2}>
                    Logout
                  </Button>
                </Grid.Row>
              </Grid>
            </Responsive>

            <div className="workspace-container">
              <DocumentDisplay
                handleFileDrop={(result, file) => this.props.handleFileDrop(result, file)}
                onCropChange={(crop) => this.props.onCropChange(crop)}
                onCropComplete={(text) => this.props.onCropComplete(text)}
                store={this.props.store}
                setCroppedImage={(croppedImage) => this.props.setCroppedImage(croppedImage)}
                send={(output) => this.sendOutputText(output)}
              />
              <ContentTable style={{margin: "50px"}} send={(output) => this.sendTable(output)} saveTitle={this.props.saveTitle}/>
            </div>
            <ExportBar
              store={this.props.store}
              outputText={this.state.outputText} table={this.state.tableData}
              reset={() => this.props.reset()}
            />
          </div>
          :
            <div>
              <LandingPage continueOffline={() => this.continueOffline()} login={() => this.login()} />
            </div>
        }

      </div>
    );
  }
}

export default App;
