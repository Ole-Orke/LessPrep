import React, { Component } from 'react';
import FileDrop from "react-file-drop";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

class DocumentDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
      file: "",
      displaying: false,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      },
      croppedImage: "",
    }
  }

  handleDrop(files, event) {
    let reader = new FileReader();
    let file = files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(file);
      this.setState({
        imageUrl: reader.result,
        file: file,
        displaying: true
      });
    }
  }

  onCropChange(crop) {
    this.setState({
      crop: crop
    });
  }

  render() {
    const documentStyle = {
      height: "80vh",
      padding: 0,
      margin: 0,
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      overflow: "auto"
    }
    const fileDropStyle = {
      height: "100%",
      width: "100%",
    }
    const imageStyle = {
      minWidth: "100%",
      maxWidth: "100%",
      border: "1px solid grey",
    }
    return (
      <div style={documentStyle}>
        {this.state.displaying ? <ReactCrop
            crop={this.state.crop}
            style={imageStyle} src={this.state.imageUrl}
            onChange={(crop) => this.onCropChange(crop)}
          />
            :
            <FileDrop style={fileDropStyle} onDrop={(files, event) => this.handleDrop(files, event)}>Drop an image here!</FileDrop>}
      </div>
    )
  }
}

export default DocumentDisplay;
