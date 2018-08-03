import React, { Component } from 'react';

class ExportBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const exportStyle = {
      background: "linear-gradient(#a0c3ff, #6AA1FF)",
      height: "6vh"
    }
    return (
      <div style={exportStyle}>

      </div>
    )
  }
}

export default ExportBar;
