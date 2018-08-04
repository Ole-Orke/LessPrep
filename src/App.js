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
      sessionStarted: false,
      loggedIn: false
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
    console.log(this.state.sessionStarted);
    return (
      <div className="Window">
        <div className="App">
          <header className="App-header">
            {this.state.sessionStarted ? <span><h1 className="App-title">LessPrep</h1><span style={{position: "absolute", top: "5px", right: "10px"}}><button className="btn btn-primary" onClick={() => this.logout()}>Logout</button></span></span> : <div><h1 className="App-title">LessPrep</h1></div>}
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
          <LandingPage continueOffline={() => this.continueOffline()} login={() => this.login()} />
        </div>
      }

      </div>
    );
  }
}

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registering: true
    }
  }

  goToLogin() {
    this.setState({
      registering: false
    });
  }

  goToRegistration() {
    console.log("go to registration")
    this.setState({
      registering: true
    });
  }

  render() {
    return (
      <div>
        {this.state.registering ? <Registration continueOffline={() => this.props.continueOffline()}  goToLogin={() => this.goToLogin()}/> : <Login login={() => this.props.login()} goToRegistration={() => this.goToRegistration()} />}
      </div>
    )
  }
}

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: ""
    }
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

  login() {
    fetch('/api/user/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      })
    })
    .then((resp)=> {
      return resp.json();
    })
    .then((resJson) => {
      console.log(resJson);
      if (resJson.success) {
        console.log("Login successful");
        this.props.login();
      }
      else {
        console.log("Login failed");
      }
    })
    .catch((err) => {
      console.log(err);
    })
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
              Login
            </h3>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" onChange={(event) => this.onEmailChange(event)} value={this.state.email} placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" onChange={(event) => this.onPasswordChange(event)} value={this.state.password} placeholder="Password" />
          </div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <button onClick={() => this.login()} className="btn btn-light">
              Login
            </button>
            <button onClick={() => this.props.goToRegistration()} className="btn btn-light">
              Go to registration
            </button>
          </div>
        </div>
      </div>
    )
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
        this.props.goToLogin();
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
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <button onClick={() => this.register()} className="btn btn-light">
              Register
            </button>
            <button onClick={() => this.props.continueOffline()} className="btn btn-light">
              Continue Offline
            </button>
            <button onClick={() => this.props.goToLogin()} className="btn btn-light">
              Go to login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
