import React, { Component } from 'react';
import ContentTable from "./components/ContentTable.js";
import DocumentDisplay from "./components/DocumentDisplay.js";
import ExportBar from "./components/ExportBar.js";
import LandingPage from "./components/LandingPage.js";
import { Image, Header, Segment, Button, Dropdown, Grid, Responsive, Icon, Loader } from "semantic-ui-react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputText: "",
      tableData: [],
      sessionStarted: false,
      loggedIn: false,
      userId: ""
    }
  }

  componentDidMount() {
    console.log(this.state.sessionStarted, this.state.loggedIn);
  }

  sendTable = (output) => {
    // this.props.store.dispatch({
    //   type: 'UPDATE_TABLE',
    //   data: {
    //     tableData: output
    //   }
    // });
    console.log('store state: ', this.props.store.getState());
    this.setState({
      tableData: output
    });
    console.log('store state: ', this.props.store.getState());
  }

  sendOutputText = (output) => {
    console.log("sendOutputText called!\n", output);
    this.setState({
      outputText: output
    });
  }

  login(userId){
    console.log("Login function userId:", userId);
    this.setState({
      loggedIn: true,
      sessionStarted: true,
      userId: userId
    });
  }

  continueOffline() {
    this.setState({
      sessionStarted: true
    });
  }

  saveTable() {
    console.log('store state: ', this.props.store.getState())
    let tempTitle = this.props.store.getState().tableTitle;
    fetch('/api/table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // title: this.props.store.getState().tableTitle,
        // data: this.props.store.getState().tableData
        title: tempTitle,
        data: this.props.store.getState().tableData

      })
    })
    .then((resp) => resp.json())
    .then((response) => {
      if (response.error) {
        alert(response.error);
      }
    })
    .catch((error) => {
      console.log('error: ', error)
    })
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
      this.props.reset();
      this.setState({
        loggedIn: false,
        sessionStarted: false,
        userId: ""
      });
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
                  <Grid.Column width={1}>
                    <Icon as={Dropdown} style={{fontSize: "2em"}} icon="align justify" size='mini'>
                      <Dropdown.Menu>
                        <Dropdown.Item text='New' />
                        <Dropdown.Item text='Open...'/>
                        <Dropdown.Item text='Save as...' onClick={() => this.saveTable()}/>
                      </Dropdown.Menu>
                    </Icon>
                </Grid.Column>
                  <Grid.Column width={2}>
                      <Header style={{fontSize: "2.5em"}} className="App-title">
                        <Image src={require('./Images/LessPrep_Logo_extended.png')} shapeRendering="crisp-edges"></Image>
                      </Header>
                    </Grid.Column>
                  <Grid.Column>
                    {this.props.store.getState().imageUrl ?
                      <div as={Grid.Column} width={1}>
                        {this.props.store.getState().tessFinish ?
                          <div>
                            {this.props.store.getState().outputText ?
                              <CopyToClipboard text={this.props.store.getState().outputText}
                                onCopy={() => {console.log("copied!")}}>
                                <Button className="btn">Copy to clipboard</Button>
                              </CopyToClipboard>
                            :
                            <div></div>
                          }
                          </div>
                        :
                        <div style={{display: "inline-block", marginBottom: "30px"}}>
                          <Loader active>Working</Loader>
                        </div>
                      }
                      </div>
                    :
                    <div>
                    </div>
                  }
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
                        <Image src={require('./Images/LessPrep_Logo.png')}></Image>
                      </Header>

                      <Dropdown style={{fontSize: "2em"}} icon="align justify">
                        <Dropdown.Menu>
                          <Dropdown.Item text='New' />
                          <Dropdown.Item text='Open...' />
                          <Dropdown.Item text='Save as...' onClick={() => this.saveTable()}/>
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
                userId={this.state.userId}
              />
              <ContentTable
                style={{margin: "50px"}}
                send={(output) => this.props.updateTable(output)}
                store={this.props.store}
                saveTitle={this.props.saveTitle}
                updateStoreTable={this.props.updateTable}
              />
            </div>
            <ExportBar
              store={this.props.store}
              outputText={this.state.outputText} table={this.state.tableData}
              reset={() => this.props.reset()}
            />
          </div>
          :
            <div>
              <LandingPage continueOffline={() => this.continueOffline()} login={(userId) => this.login(userId)} />
            </div>
        }

      </div>
    );
  }
}

export default App;
