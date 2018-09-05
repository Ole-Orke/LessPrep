import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import jsPdf from 'jspdf';
import {Button, Segment} from "semantic-ui-react";

class ExportBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      revealExportOptions: false,
    }
  }

  reveal() {
    console.log(this.props.table)
    this.state.revealExportOptions ?
    this.setState({revealExportOptions: false}) :
    this.setState({revealExportOptions: true})

  }

  toFlashcard() {
    let fileName = prompt('Filename:', 'Ex: my-flashcards');
    console.log('fileName: ', fileName)
    let tableVals = this.props.table.slice();
    let tableLength  = tableVals.length;
    let pagesToMake = Math.ceil(tableLength / 6);
    let leftovers = tableLength % 6;
    console.log('pagesToMake:', pagesToMake);
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
    for (let i = 1; i <= pagesToMake; i++) {
      if (! flashcardPdf) {
        var flashcardPdf = new jsPdf();
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


  render() {
    // console.log("export props", this.props);
    const exportStyle = {
      background: "#f2f2f2",
      height: "6%",
      display: "flex",
      justifyContent: "space-around",
      position: "absolute",
      bottom: "0",
      right: "0",
      width: "100vw",
      border: "2px solid #e0e0e0"
    }
    const exportElementStyle = {
      padding: "10px",
    }
    const hiddenExportStyle = {
      padding: "10px",
      display: "none",
    }

    const exportOptionsOn ={
     backgroundColor: '#0069d9',
     borderColor: '#0069d9',
     color: 'white',
     marginLeft: '5px'
   }
   const exportOptionsOff ={
     backgroundColor: '#0069d9',
     borderColor: '#0069d9',
     color: 'white',
     display: 'none'
   }

    return (
      <div style={exportStyle}>
        <div style={exportElementStyle}>
          <Button compact onClick={() => this.props.reset()} className="btn btn-primary">Reset</Button>
        </div>
        <div style={exportElementStyle}>
          <CopyToClipboard text={this.props.store.getState().outputText}
            onCopy={() => {console.log("copied!")}}>
            <Button compact className="btn btn-primary">Copy to clipboard</Button>
          </CopyToClipboard>
        </div>
        <div style={exportElementStyle}>
          <Button compact>Save</Button>
        </div>
        <div style={exportElementStyle}>
          <Button compact onClick={() => this.reveal()} className="btn btn-primary">Export</Button>
          <Button compact onClick={()=> this.toFlashcard()} style={this.state.revealExportOptions ? exportOptionsOn : exportOptionsOff} className="btn export-to-flashcard">to Flashcards</Button>
        </div>
      </div>
    )
  }
}


export default ExportBar;
