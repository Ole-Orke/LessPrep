import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import { Table, Button, Input } from "semantic-ui-react";

class ContentTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      newData:{concept:'',explanation:''},
      isEditing: false
    }
  }

  componentDidMount(){
  }

  keyPress(event){
    if (event.keyCode === 13) {
      this.updateTable(event);
    }
  }

  updateTable(event) {

    // console.log('inputIndex: ', this.state.inputIndex);
    var tempData = this.state.data.slice();
    console.log('TEMPDATA1', tempData)
    console.log('newData: ', this.state.newData);
    tempData.push(this.state.newData);
    if ((this.state.newData.concept && this.state.newData.explanation)) {
      this.props.send(tempData);
      this.setState({data:tempData, newData:{concept:'',explanation:''}});
    }
    // console.log('this.state.data: ', this.state.data)

    // var tempState = store.state.tableData.slice();
    // tempData.push(this.state.newData);
    // let updatedTableData = tempState;
    // this.props.updateStoreTable(updatedTableData);
  }

  updateConcept(event) {
    // console.log('this: ',this)
    var tempState = this.state;
    tempState.newData.concept = event.target.value;
    this.setState({newData:tempState.newData})
    // console.log('newData: ', this.state.newData)
  }

  editConcept (event) {
    var tempState = this.state;
    tempState.data[event.target.attributes[1].value].concept = event.target.value;
    this.setState({data:tempState.data, isEditing:true});
  }

  updateExplanation(event) {
    console.log('explanation length: ', event.target.value.length)
    if (event.target.value.length > 32*13) {
      alert('Maximum explanation size reached');
    } else {
      var tempState = this.state;
      console.log("event.target.attributes[1].value: ", event.target.attributes[1].value);
      if (event.target.attributes[1].value !== 'ExplanationInput') {
        tempState.editContent.explanation = event.target.value;
        this.setState({editContent:tempState.editContent});
      } else {
        tempState.newData.explanation = event.target.value;
        this.setState({newData:tempState.newData})
      }
    }
  }

  editExplanation(event) {
    // console.log('editExplanation called')
    // console.log('event.target.value: ', event.target.value)
    var tempState = this.state;
    // console.log('tempState: ', tempState)
    tempState.data[event.target.attributes[1].value].explanation = event.target.value;
    this.setState({data:tempState.data, isEditing:true});
    // console.log('event.target.value: ', event.target.value)
  }





  renderMap() {
    let result = [];
    console.log('render map called')

    const labelStyle = {
      display: 'flex',
      flexDirection: 'row'
    }

    const cellStyle = {
      border:'solid #d2d2d2 1px'
    }

    const cellStyle1 = {
      border:'solid #d2d2d2 1px',
      minHeight: '20px',
      padding: '15px',
      borderRadius: '2px',
    }

    const cellStyle2 = {
      border:'solid #d2d2d2 1px',
      backgroundColor: '#f7f9ff',
      minHeight: '20px',
      padding: '15px',
      borderRadius: '2px',
    }

    let index = 0;
    // this.state.data.map((pair) => {
    //   result.push(
    //     <div className="col-sm-12" style={labelStyle}>
    //       <input
    //         className="col-sm-6 cell"
    //         style={(index %2) ? cellStyle1 : cellStyle2}
    //         rowindex={index}
    //         onChange={(event)=>{this.editConcept(event); this.updateTable(event)}}
    //         onKeyDown={(e)=>this.keyPress(e)}
    //         // value={this.state.editContent ? this.state.editContent : pair.concept}
    //         value={pair.concept}
    //       />
    //       <Textarea
    //         className="col-sm-6 cell"
    //         style={(index %2) ? cellStyle1 : cellStyle2 }
    //         rowindex={index}
    //         onChange={(event)=>{this.editExplanation(event); this.updateTable(event)}}
    //         value={pair.explanation}
    //       />
    //       </div>
    //     )
    //     index ++;
    //   })
    this.state.data.map((pair) => {
      result.push(
        <div className="col-sm-12" style={labelStyle}>
          <Textarea
            className="col-sm-6 cell"
            style={(index %2) ? cellStyle1 : cellStyle2}
            rowindex={index}
            onChange={(event)=>{this.editConcept(event); this.updateTable(event)}}
            onKeyDown={(e)=>this.keyPress(e)}
            // value={this.state.editContent ? this.state.editContent : pair.concept}
            value={pair.concept}
          />
          <Textarea
            className="col-sm-6 cell"
            style={(index %2) ? cellStyle1 : cellStyle2 }
            rowindex={index}
            onChange={(event)=>{this.editExplanation(event); this.updateTable(event)}}
            value={pair.explanation}
          />
          </div>
        )
        index ++;
      })
      return result;
    }

    render() {
      const contentStyle = {
        height: "88vh",
        flex: 1,
        borderLeft: "2px solid #e0e0e0",
        width:'100%',
        overflow:'scroll',
        marginTop: '5px',
      }

      const labelStyle = {
        display: 'flex',
        flexDirection: 'row'
      }

      const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '7px'
      }

      const inputStyle = {
        padding: '15px',
        borderRadius: '2px',
      }



      console.log('data: ', this.state.data)

      return (
        <div style={contentStyle}>
          <div className="content-table" style={{height:'100%', width:'100%'}}>
            <div className="table-title">
              <Input
                type="text"
                placeholder="Table Title"
                onChange={(event) => this.props.saveTitle(event.target.value)}
                style={{paddingLeft:'15px'}}>
              </Input>
              {/* <Input type="text" placeholder="Table Title" onChange={(event) => console.log(event.target.value)}></Input> */}
            </div>
            <div className="table-labels" style={labelStyle}>
              <div className="col-sm-6"><strong>Concept:</strong></div>
              <div className="col-sm-6"><strong>Explanation:</strong></div>
            </div>
            <div id="table-data">
              {this.renderMap()}
            </div>
            <div className="content-input-container" style={inputContainerStyle}>
              <Textarea
                style={inputStyle}
                className="col-sm-6"
                id="ConceptInput" placeholder="New concept"
                onChange={(event)=>(this.updateConcept(event))}
                onKeyDown={(e)=>this.keyPress(e)}
                value={this.state.newData.concept}
                onClick={()=>this.setState({isEditing:false})}
              />
              <Textarea
                style={inputStyle}
                className="col-sm-6"
                id="ExplanationInput"
                placeholder="New explanation"
                onChange={(event)=>(this.updateExplanation(event))}
                onKeyDown={(e)=>this.keyPress(e)}
                value={this.state.newData.explanation}
                onClick={()=>this.setState({isEditing:false})}
              />
            </div>
            <Button type="submit" className="col-sm-12 btn btn-light" onClick={(e)=>this.updateTable(e)}><strong>Add new</strong></Button>
          </div>
        </div>
      )
    }
  }

  export default ContentTable;
