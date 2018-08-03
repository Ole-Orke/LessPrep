import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ContentTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      newData:{concept:'',explanation:''}
    }
  }

  render() {
    const contentStyle = {
      height: "80vh",
      flex: 1,
      borderLeft: "2px solid #e0e0e0",
      width:'100%'
    }
    const fakeData=[{concept:'Ole',explanation:'Horizonite'}, {concept:'Khalid', explanation:'Dude'}]
    return (
      <div style={contentStyle}>
        <div className="content-table" style={{border:'solid 2px red', height:'100%', overflow:'scroll'}}>
        <div className="content-input-container" style={{display:'flex',flexDirection:'row', width:'100%'}}>
            <input id="ConceptInput" style={{flex:1}}/>
            <input id="ExplanationInput" stlye={{flex:1}}/>
        </div>
        </div>
      </div>
    )
  }
}

export default ContentTable;
