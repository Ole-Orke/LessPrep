import React, { Component } from 'react';
import ContentTable from "./components/ContentTable.js";
import DocumentDisplay from "./components/DocumentDisplay.js";
import ExportBar from "./components/ExportBar.js";
import LandingPage from "./components/LandingPage.js";
import { Header, Segment, Button } from "semantic-ui-react";
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
      backgroundColor: "#f2f2f2"
    }
    console.log(this.state.sessionStarted);
    return (
      <div className="Window">

        {this.state.sessionStarted ?
          <div>
            <div className="App">
              <Segment style={headerStyle} clearing>
                {this.state.sessionStarted ? <span><Header floated="left" className="App-title">LessPrep</Header><Button floated="right" onClick={() => this.logout()}>Logout</Button></span> : <div><h1 className="App-title">LessPrep</h1></div>}
              </Segment>
            </div>
            <div className="workspace-container">
              <DocumentDisplay
                handleFileDrop={(result, file) => this.props.handleFileDrop(result, file)}
                onCropChange={(crop) => this.props.onCropChange(crop)}
                onCropComplete={(text) => this.props.onCropComplete(text)}
                store={this.props.store}
                setCroppedImage={(croppedImage) => this.props.setCroppedImage(croppedImage)}
                send={(output) => this.sendOutputText(output)}
              />
              <ContentTable  send={(output) => this.sendTable(output)}/>
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
