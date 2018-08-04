import React, { Component } from 'react';

class ContentTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      newData:{concept:'',explanation:''}
    }
  }

  componentDidMount(){
    const fakeData=[{concept:'Ole',explanation:'Horizoniteeeeeeeeerererererererererererasraser asra sraseraser asrasf asdvcas fasef asd vasdvas dvasd asdf asdv asdf '}, {concept:'Khalid', explanation:'Dude'}];
    this.setState({data:fakeData});
  };

  keyPress(event){
    if (event.keyCode === 13) {
      this.updateTable(event);
    }
  }

  updateTable(event) {
    var tempData = this.state.data.slice();
    console.log('TEMPDATA1', tempData)
    tempData.push(this.state.newData);
    this.setState({data:tempData, newData:{concept:'',explanation:''}})
  }

  updateConcept(event) {
    console.log('this: ',this)
    var tempState = this.state
    tempState.newData.concept = event.target.value;
    this.setState({newData:tempState.newData})
  }

  updateExplanation(event) {
    var tempState = this.state
    tempState.newData.explanation = event.target.value;
    this.setState({newData:tempState.newData})
  }




  renderMap() {
    let result = [];
    console.log('called')

    const labelStyle = {
      display: 'flex',
      flexDirection: 'row'
    }

    const cellStyle = {
      border:'solid #d2d2d2 1px'
    }

    const cellStyle1 = {
      border:'solid #d2d2d2 1px'
    }

    const cellStyle2 = {
      border:'solid #d2d2d2 1px',
      backgroundColor: '#f7f9ff'
    }

    let index = 0;
    this.state.data.map((pair) => {
      index ++;
      result.push(
        <div className="col-sm-12" style={labelStyle}>
          <div className="col-sm-6" style={(index %2) ? cellStyle1 : cellStyle2 }>{pair.concept}</div>
          <div className="col-sm-6" style={(index %2) ? cellStyle1 : cellStyle2 }>{pair.explanation}</div>
        </div>
      )})
      return result;
  }

  render() {
    const contentStyle = {
      height: "80vh",
      flex: 1,
      borderLeft: "2px solid #e0e0e0",
      width:'100%',
      overflow:'scroll'
    }

    const labelStyle = {
      display: 'flex',
      flexDirection: 'row'
    }

    const inputStyle = {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: '7px'
    }

    const cellStyle = {
      border:'solid #d2d2d2 1px'
    }

    const cellStyle1 = {
      border:'solid #d2d2d2 1px'
    }

    const cellStyle2 = {
      border:'solid #d2d2d2 1px',
      backgroundColor: '#c8cace'
    }


    console.log('data: ', this.state.data)

    return (
      <div style={contentStyle}>
        <div className="content-table" style={{height:'100%', width:'100%'}}>
          <div className="table-labels" style={labelStyle}>
            <div className="col-sm-6">Concept:</div>
            <div className="col-sm-6">Explanation:</div>
          </div>
          <div id="table-data">
          {/* {this.state.data.map((pair) => {
            return (
              <div className="col-sm-12" style={labelStyle}>
                <div className="col-sm-6" style={(index %2) ? cellStyle1 : cellStyle2 }>{pair.concept}</div>
                <div className="col-sm-6" style={cellStyle}>{pair.explanation}</div>
              </div>
            )})} */}
            {this.renderMap()}
            </div>
          <div className="content-input-container" style={inputStyle}>
            <input className="col-sm-6" id="ConceptInput" placeholder="New concept" onChange={(event)=>(this.updateConcept(event))} onKeyDown={(e)=>this.keyPress(e)} value={this.state.newData.concept}/>
            <input className="col-sm-6" id="ExplanationInput" placeholder="New explanation" onChange={(event)=>(this.updateExplanation(event))} onKeyDown={(e)=>this.keyPress(e)} value={this.state.newData.explanation}/>
          </div>
          <input type="submit" className="col-sm-12" value="Add new" onClick={(e)=>this.updateTable(e)}/>
        </div>
      </div>
    )
  }
}

export default ContentTable;
