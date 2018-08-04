import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class ExportBar extends Component {
  constructor(props){
    super(props);
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
          <button className="btn btn-primary">Export</button>
        </div>
      </div>
    )
  }
}

export default ExportBar;
