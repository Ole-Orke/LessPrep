import React, { Component } from 'react';
import logo from './logo.svg';
import ContentTable from "./components/ContentTable.js";
import DocumentDisplay from "./components/DocumentDisplay.js";
import ExportBar from "./components/ExportBar.js";
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

export default App;
