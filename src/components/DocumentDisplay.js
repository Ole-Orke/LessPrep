import React, { Component } from 'react';
import FileDrop from "react-file-drop";

class DocumentDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
      file: "",
      displaying: false
    }
  }

  handleDrop(files, event) {
    let reader = new FileReader();
    let file = files[0];
    console.log(reader);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result,
        file: file,
        displaying: true
      });
    }
  }

  render() {
    const documentStyle = {
      height: "80vh",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
    const fileDropStyle = {
      height: "100px",

    }
    const imageStyle = {
      overflow: "scroll",
      width: "100%",
      border: "1px solid grey",
    }
    return (
      <div style={documentStyle}>
        <div>
          {this.state.displaying ? <img style={imageStyle} src={this.state.imageUrl}></img> : <FileDrop style={fileDropStyle} onDrop={(files, event) => this.handleDrop(files, event)}>Drop an image here!</FileDrop>}
        </div>
      </div>
    )
  }
}

export default DocumentDisplay;
