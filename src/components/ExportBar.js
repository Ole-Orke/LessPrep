import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import jsPdf from 'jspdf';

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
    // console.log('toFlashcard called');
    // console.log(this.props.table);
    let fileName = prompt('Filename:', 'Ex: my-flashcards');
    console.log('fileName: ', fileName)
    let flashcardPdf = new jsPdf();
    let tableVals = this.props.table.slice();
    let tableLength  = tableVals.length;
    let pagesToMake = Math.ceil(tableLength / 6);
    let leftovers = tableLength % 6;
    console.log('pagesToMake:', pagesToMake);
    console.log('leftovers: ', leftovers);
    console.log(tableVals);
    // positioning variables :
    // let a = [42, 49.5];
    // let b = [147, 49.5];
    // let c = [42, 148.5];
    // let d = [147, 148.5];
    // let e = [42, 247.5];
    // let f = [147, 247.5];
    let conceptPosition = [[42, 49.5],[147, 49.5],[42, 148.5],[147, 148.5],[42, 247.5],[147, 247.5]];
    let explanationPosition = [[147, 49.5],[42, 49.5],[147, 148.5],[42, 148.5],[147, 247.5],[42, 247.5]]
    // Big loop, one for each set of 6
    for (let i = 1; i <= pagesToMake; i++) {
      // if(i > 1) {
      //   flashcardPdf.addPage();
      // }
      // let pageNum = i;
      flashcardPdf.lines([[210,0]],0, 99);
      flashcardPdf.lines([[210,0]],0, 198);
      flashcardPdf.lines([[0,297]],105, 0);
      // flashcardPdf.text('page 1!!!', a[0],a[1])
      // let page2 = flashcardPdf.addPage();
      // page2.lines([[210,0]],0, 99);
      // page2.lines([[210,0]],0, 198);
      // page2.lines([[0,297]],105, 0);
      flashcardPdf.addPage();
      flashcardPdf.lines([[210,0]],0, 99);
      flashcardPdf.lines([[210,0]],0, 198);
      flashcardPdf.lines([[0,297]],105, 0);
      // page2.text('page 2!!!!', a[0], a[1]);
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
      flashcardPdf.addPage();
    }
    flashcardPdf.save(fileName);
  }

  render() {
    console.log("export props", this.props);
    const exportStyle = {
      background: "linear-gradient(#a0c3ff, #6AA1FF)",
      height: "6%",
      display: "flex",
      justifyContent: "space-around",
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
          <button className="btn btn-primary">Reset</button>
        </div>
        <div style={exportElementStyle}>
          <CopyToClipboard text={this.props.outputText}
            onCopy={() => {console.log("copied!")}}>
            <button className="btn btn-primary">Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <div style={exportElementStyle}>
          <button onClick={() => this.reveal()} className="btn btn-primary">Export</button>
          <button onClick={()=> this.toFlashcard()} style={this.state.revealExportOptions ? exportOptionsOn : exportOptionsOff} className="btn export-to-flashcard">to Flashcards</button>
        </div>
      </div>
    )
  }
}

export default ExportBar;
