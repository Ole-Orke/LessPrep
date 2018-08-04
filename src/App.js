import React, { Component } from 'react';
import logo from './logo.svg';
import ContentTable from "./components/ContentTable.js";
import DocumentDisplay from "./components/DocumentDisplay.js";
import ExportBar from "./components/ExportBar.js";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputText: "",
    }
  }

  exportPpt() {

  }

  sendOutputText = (output) => {
    console.log("sendOutputText called!\n", output);
    this.setState({
      outputText: output
    });
  }

  render() {
    console.log(this.sendOutputText);
    return (
      <div className="Window">
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">LessPrep</h1>
          </header>
        </div>
        <div className="workspace-container">
          <DocumentDisplay send={(output) => this.sendOutputText(output)} />
          <ContentTable  />
        </div>
        <ExportBar outputText={this.state.outputText}/>
      </div>
    );
  }
}

export default App;
