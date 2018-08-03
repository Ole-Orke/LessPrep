import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="Window">
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">LessPrep</h1>
          </header>
        </div>
        <div className="workspace-container">
          <DocumentDisplay />
          <ContentTable />
        </div>
        <ExportBar />
      </div>
    );
  }
}

class ContentTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const contentStyle = {
      height: "80vh",
      flex: 1,
      borderLeft: "2px solid #e0e0e0"
    }
    return (
      <div style={contentStyle}>
      </div>
    )
  }
}

class DocumentDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const documentStyle = {
      height: "80vh",
      flex: 1
    }
    return (
      <div style={documentStyle}>

      </div>
    )
  }
}

class ExportBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const exportStyle = {
      background: "linear-gradient(#a0c3ff, #6AA1FF)",
      height: "6vh"
    }
    return (
      <div style={exportStyle}>

      </div>
    )
  }
}

export default App;
