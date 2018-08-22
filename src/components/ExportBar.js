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
    // let flashcardPdf = new jsPdf();
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
    // let conceptPosition =     [[42, 49.5],[147, 49.5],[42, 148.5],[147, 148.5],[42, 247.5],[147, 247.5]];
    // let explanationPosition = [[147, 49.5],[42, 49.5],[147, 148.5],[42, 148.5],[147, 247.5],[42, 247.5]]
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
      // if(i > 1) {
      //   flashcardPdf.addPage();
      // }
      // let pageNum = i;
      if (! flashcardPdf) {
        var flashcardPdf = new jsPdf();
      } else {
        flashcardPdf.addPage()
      }

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
      // flashcardPdf.addPage();
    }
    flashcardPdf.save(fileName);
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

// pptx.generate ( response );
// }).listen ( 4000 );

export default ExportBar;
