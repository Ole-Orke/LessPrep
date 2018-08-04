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
      tableData: [],
      sessionStarted: false
    }
  }

  exportPpt() {

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

  render() {
    console.log(this.sendOutputText);
    return (
      <div className="Window">
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">LessPrep</h1>
          </header>
        </div>
        {this.state.sessionStarted ? <div>
          <div className="workspace-container">
            <DocumentDisplay send={(output) => this.sendOutputText(output)} />
            <ContentTable  send={(output) => this.sendTable(output)}/>
          </div>
          <ExportBar outputText={this.state.outputText} table={this.state.tableData}/>
        </div>
        :
        <div>
          <Registration />
        </div>
      }

      </div>
    );
  }
}

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  register() {
    fetch('/api/user/register', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then((res)=> (res.json()))
    .then((resJson) => {
      console.log(resJson);
      if (resJson.success) {
        console.log("Registration successful");
      }
      else {
        console.log("Registration failed");
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  onEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  onPasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }

  render() {
    const formContainer = {
      marginTop: "10%",
      marginRight: "30%",
      marginLeft: "30%",
      paddingTop: "2%",
      paddingLeft: "3%",
      paddingRight: "3%",
      paddingBottom: "3%",
      backgroundColor: "#e0ebff",
      borderRadius: "5px",
    }
    return (
      <div className="container-fluid">
        <div style={formContainer}>
          <div style={{textAlign: "center"}}>
            <h3>
              Register
            </h3>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(event) => this.onEmailChange(event)} value={this.state.email} placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(event) => this.onPasswordChange(event)} value={this.state.password} placeholder="Password" />
          </div>
          <div style={{textAlign: "center"}}>
            <button onClick={() => this.register()} className="btn btn-light">
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
