import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import jsPDF from 'jspdf';

class ExportBar extends Component {
  constructor(props){
    super(props);
    this.state={
      showExportOptions: false
    }
  }

  // http.createServer ( function ( request, response ) {
  // response.writeHead ( 200, {
  //   "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  //   'Content-disposition': 'attachment; filename=surprise.pptx'
  //   });

  makeFlashcards(tableData) {
    var flashcardPdf = new jsPDF();
    var len = tableData.length;
    var conceptArr = [];
    var explanationArr = [];
    // console.log(len);
    // tableData.map((pair)=> conceptArr.push(pair.concept));
    // tableData.map((pair)=> explanationArr.push(pair.explanation));
    // var i = Math.floor(len / 6);
    // var r = len%6;
    // console.log(i);
    // if (i <= 1){

    // for (var bigLoops = 0; bigLoop <= i; bigLoops++){
    //   //concept side
    //   flashcardPdf.lines([[210,0]],0, 99);
    //   flashcardPdf.lines([[210,0]],0, 198);
    //   flashcardPdf.lines([[0,297]],105, 0);
    //   var x = 42;
    //   var y = 49.5;
    //   for (var j = 0; j < len; j++) {
    //     console.log('(x,y): ', x,y)
    //     flashcardPdf.text(tableData[j].concept, x, y)
    //     y = (y+99)
    //     if (j === 2) {
    //       x = (x+105)
    //     }
    //     if (j === 2) {
    //       y = 49.5;
    //     }
    //   }
    //   //explanation side
    //   flashcardPdf.addPage();
    //   flashcardPdf.lines([[210,0]],0, 99);
    //   flashcardPdf.lines([[210,0]],0, 198);
    //   flashcardPdf.lines([[0,297]],105, 0);
    //   x = 147;
    //   y = 49.5;
    //   for (var j = 0; j < len; j++) {
    //     console.log('(x,y): ', x,y)
    //     flashcardPdf.text(tableData[j].explanation, x, y)
    //     y = (y+99)
    //     if (j === 2) {
    //       x = (x-105)
    //     }
    //     if (j === 2) {
    //       y = 49.5;
    //     }
    //   }
    //   bigLoop++;
    // }

    tableData.map((pair)=> conceptArr.push(pair.concept));
    tableData.map((pair)=> explanationArr.push(pair.explanation));
    var i = Math.floor(len / 6);
    var r = len%6;
    var reverse = false;
    var counterC = 0;
    var counterE = 0;
    console.log(i);
    if (!r){
      for (var bigLoop = 0; bigLoop < i; bigLoop++){
        if(bigLoop>0){flashcardPdf.addPage()}
        // if(! reverse) {
        flashcardPdf.lines([[210,0]],0, 99);
        flashcardPdf.lines([[210,0]],0, 198);
        flashcardPdf.lines([[0,297]],105, 0);
        var x = 42;
        var y = 49.5;
        for (var j = 0; j < 6; j++) {
          console.log('conceptArr: ', conceptArr);
          console.log('(x,y): ', x,y)
          flashcardPdf.text(conceptArr[j], x, y)
          y = (y+99)
          if (j === 2) {
            x = (x+105)
          }
          if (j === 2) {
            y = 49.5;
          }
          counterC++;
        }
        conceptArr.splice(0,6);
        console.log(conceptArr);

        // reverse = true;
        // if(reverse) {
        flashcardPdf.addPage();
        flashcardPdf.lines([[210,0]],0, 99);
        flashcardPdf.lines([[210,0]],0, 198);
        flashcardPdf.lines([[0,297]],105, 0);
        x = 147;
        y = 49.5;
        for (var j = 0; j < 6; j++) {
          console.log('explanationArr: ', explanationArr);
          console.log('(x,y): ', x,y)
          flashcardPdf.text(explanationArr[j], x, y)
          y = (y+99)
          if (j === 2) {
            x = (x-105)
          }
          if (j === 2) {
            y = 49.5;
          }
          counterE++;
        }
        explanationArr.splice(0,6);
        console.log(explanationArr);


      }

      // reverse = false;
    }
    // flashcardPdf.addPage();
    // flashcardPdf.lines([[210,0]],0, 99);
    // flashcardPdf.lines([[210,0]],0, 198);
    // flashcardPdf.lines([[0,297]],105, 0);
    // for (var m = 0; m<r; m++) {
    //   var x = 42;
    //   var y = 49.5;
    //   for (var j = 0; j<r; j++) {
    //     console.log('conceptArr: ', conceptArr);
    //     console.log('(x,y): ', x,y)
    //     flashcardPdf.text(conceptArr[j], x, y)
    //     y = (y+99)
    //     if (j === 2) {
    //       x = (x+105)
    //     }
    //     if (j === 2) {
    //       y = 49.5;
    //     }
    //
    //   }
    //
    // }
    // // }
    // flashcardPdf.addPage();
    // flashcardPdf.lines([[210,0]],0, 99);
    // flashcardPdf.lines([[210,0]],0, 198);
    // flashcardPdf.lines([[0,297]],105, 0);
    // x = 147;
    // y = 49.5;
    // for (var j = 0; j < r; j++) {
    //   console.log('explanationArr: ', explanationArr);
    //   console.log('(x,y): ', x,y)
    //   flashcardPdf.text(explanationArr[j], x, y)
    //   y = (y+99)
    //   if (j === 2) {
    //     x = (x-105)
    //   }
    //   if (j === 2) {
    //     y = 49.5;
    //   }
      flashcardPdf.save('TestPdf');
    // }
  }


  render() {
    // console.log("export props", this.props);
    const exportStyle = {
      background: "linear-gradient(#a0c3ff, #6AA1FF)",
      height: "6%",
      display: "flex",
      justifyContent: "space-around",
    }
    const exportElementStyle = {
      padding: "10px",
    }
    const exportOptionsOn ={
      backgroundColor: '#0069d9',
      borderColor: '#0069d9',
      marginLeft: '5px'
    }
    const exportOptionsOff ={
      backgroundColor: '#0069d9',
      borderColor: '#0069d9',
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
          <button onClick={() => {this.setState({showExportOptions: true})}} className="btn btn-primary">Export</button>
          <button className="btn btn-secondary" style={this.state.showExportOptions ? exportOptionsOn : exportOptionsOff} onClick={(event) => {this.setState({showExportOptions:false}); this.makeFlashcards(this.props.table)}}>To Flashcards</button>
        </div>
      </div>
    )
  }
}

// pptx.generate ( response );
// }).listen ( 4000 );

export default ExportBar;
