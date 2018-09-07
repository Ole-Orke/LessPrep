import React, { Component } from 'react';
import ContentTable from "./components/ContentTable.js";
import DocumentDisplay from "./components/DocumentDisplay.js";
import ExportBar from "./components/ExportBar.js";
import LandingPage from "./components/LandingPage.js";
import { Image, Header, Segment, Button, Dropdown, Grid, Responsive, Icon, Loader } from "semantic-ui-react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import jsPdf from 'jspdf';
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

  toFlashcard() {
    let fileName = prompt('Filename:', 'Ex: my-flashcards');
    console.log('fileName: ', fileName)
    console.log('this.props.store: ', this.props.store)
    let tableVals = this.props.store.getState().tableData.slice();
    let tableLength  = tableVals.length;
    let pagesToMake = Math.ceil(tableLength / 6);
    let leftovers = tableLength % 6;
    console.log('tableLength: ', tableLength)
    console.log('pagesToMake: ', pagesToMake);
    console.log('leftovers: ', leftovers);
    console.log(tableVals);

    // positioning variables :
    let conceptPosition = [[12, 14.5],[117, 14.5],[12, 113.5],[117, 113.5],[12, 212.5],[117, 212.5]];
    let explanationPosition = [[117, 14.5],[12, 14.5],[117, 113.5], [12, 113.5],[117, 212.5],[12, 212.5]]


    tableVals.forEach((value) => {
      if (value.concept.length > 32) {
        let newVals = [];
        console.log('newVals type: ', typeof newVals);
        for (let a = 0; a < value.concept.length; a += 32) {
          var line = value.concept.slice(a,Math.min(a+32, value.concept.length - 1));
          newVals.push(line);
        }
        value.concept = newVals;
      }

      if (value.explanation.length > 32) {
        let newVals = [];
        console.log('newVals type: ', typeof newVals);
        for (let a = 0; a < value.explanation.length; a += 32) {
          var line = value.explanation.slice(a,Math.min(a+32, value.explanation.length - 1));
          newVals.push(line);
        }
        value.explanation = newVals;
      }
    })

    // Big loop, one for each set of 6
    var flashcardPdf = null;
    for (let i = 1; i <= pagesToMake; i++) {
      if (! flashcardPdf) {
        flashcardPdf = new jsPdf();
      } else {
        flashcardPdf.addPage()
      }

      flashcardPdf.lines([[210,0]],0, 99);
      flashcardPdf.lines([[210,0]],0, 198);
      flashcardPdf.lines([[0,297]],105, 0);
      flashcardPdf.addPage();
      flashcardPdf.lines([[210,0]],0, 99);
      flashcardPdf.lines([[210,0]],0, 198);
      flashcardPdf.lines([[0,297]],105, 0);

      // Inner loop for 6 items at a time:
      for (let k = 0; k < 6; k++) {
        console.log('is table values null: ',tableVals[0] == null);
        if(tableVals[0]  == null) {
          break;
        }
        console.log('concept page = ', 2*i-1);
        flashcardPdf.setPage(2*i - 1);
        flashcardPdf.text(tableVals[0]['concept'], conceptPosition[k][0],conceptPosition[k][1]);
        console.log('explanation page = ', 2*i);
        flashcardPdf.setPage(2*i);
        flashcardPdf.text(tableVals[0]['explanation'], explanationPosition[k][0],explanationPosition[k][1]);
        tableVals.shift();
      }
    }
    flashcardPdf.save(fileName);
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

    const exportElementStyle = {
      padding: "10px",
    }

    console.log(this.state.sessionStarted);
    return (
      <div className="Window">

        {this.state.sessionStarted ?
          <div>


            <Responsive as={Segment} style={{padding: 0, margin: 0, backgroundColor:'#7881ff'}} minWidth={570}>
              <Grid className="App" style={{margin: 0, backgroundColor:'#7881ff'}} verticalAlign="bottom">
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Icon as={Dropdown} style={{fontSize: "2em", color:'white'}} icon="bars" size='mini' >
                      <Dropdown.Menu>
                        <Dropdown.Item text='New' />
                        <Dropdown.Item text='Open...'/>
                        <Dropdown.Item text='Save as...' onClick={() => this.saveTable()}/>
                        <Dropdown.Item text='Reset Image Loader' onClick={() => this.props.reset()}/>
                        <Dropdown.Item text="Make flashcards" onClick={()=> this.toFlashcard()} store={this.props.store}/>
                      </Dropdown.Menu>
                    </Icon>
                  </Grid.Column>
                  <Grid.Column width={1}>
                    {this.props.store.getState().imageUrl ?
                      <div as={Grid.Column}>
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
                            <div style={exportElementStyle}>

                            </div>
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
                  <Grid.Column width={11} textAlign='center'>
                    <Header style={{fontSize: "2.5em"}} className="App-title">
                      <Image src={require('./Images/LessPrep_Logo_extended.png')} shapeRendering="crisp-edges"></Image>
                    </Header>
                  </Grid.Column>

                  <Button inverted as={Grid.Column} floated="right" onClick={() => this.logout()} width={2} textAlign='center'>
                    Logout
                  </Button>
                </Grid.Row>
              </Grid>
            </Responsive>

            <Responsive as={Segment} style={{padding: 0, margin: 0, backgroundColor:'#7881ff'}} maxWidth={569}>
              <Grid className="App" style={{margin: 0, backgroundColor:'#7881ff'}} verticalAlign="bottom">
                <Grid.Row>
                  <Grid.Column width={8} textAlign="left" stretched>
                    <Dropdown style={{fontSize: "4em", color:'white'}} icon="bars">
                      <Dropdown.Menu>
                        <Dropdown.Item text='New' />
                        <Dropdown.Item text='Open...' />
                        <Dropdown.Item text='Save as...' onClick={() => this.saveTable()}/>
                        <Dropdown.Item text='Reset Image Loader' onClick={() => this.props.reset()}/>
                        <Dropdown.Item text="Make flashcards" onClick={()=> this.toFlashcard()} store={this.props.store}/>
                        <Dropdown.Item text='Logout' onClick={() => this.logout()} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Grid.Column>

                  <Grid.Column width={8} textAlign="right" verticalAlign="middle">
                    <Header style={{fontSize: "2.5em"}} className="App-title">
                      <Image src={require('./Images/LessPrep_Logo.png')}></Image>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Responsive>
            {/* <Grid.Column as={Button} floated="right" onClick={() => this.logout()} width={1} centered>
            Logout
          </Grid.Column>
          <Button as={Grid.Column} floated="right" onClick={() => this.logout()} width={2}>
          Logout
        </Button>
      </Grid.Row>
    </Grid>
  </Responsive> */}

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
