import React, { Component } from 'react';

class ExportBar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const exportStyle = {
      background: "linear-gradient(#a0c3ff, #6AA1FF)",
      height: "6vh",
      display: "flex",
      justifyContent: "space-around"
    }
    const exportElementStyle = {
      padding: "10px",
    }
    return (
      <div style={exportStyle}>
        <div style={exportElementStyle}>
          <button className="btn btn-primary">Reset</button>
        </div>
        <div style={exportElementStyle}>
          <button className="btn btn-primary">Export</button>
        </div>
      </div>
    )
  }
}

export default ExportBar;
