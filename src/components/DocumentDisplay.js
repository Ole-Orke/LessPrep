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
        x: 0,
        y: 0,
        width: 0,
        height: 0,
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
      let image = new Image();
      image.src = reader.result;
      this.setState({
        imageUrl: reader.result,
        file: file,
        displaying: true,
      });
    }
  }

  onCropChange(crop) {
    this.setState({
      crop: crop
    });
    console.log(this.state.crop);
  }

  /**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 * @param {String} fileName - Name of the returned file in Promise
 */
getCroppedImg(imageUrl, pixelCrop, fileName) {

  const canvas = document.createElement('canvas');
  console.log(canvas);
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  console.log(canvas.height, canvas.width);

  const imageElement = new Image();
  imageElement.src = imageUrl;

  console.log(ctx.drawImage);

  ctx.drawImage(
    imageElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const base64Image = canvas.toDataURL('image/jpeg');

  return base64Image;
}

  onCropComplete(crop, pixelcrop) {
    console.log("pixelcrop", pixelcrop);
    const croppedImage = this.getCroppedImg(this.state.imageUrl, pixelcrop, "outputImage");
    this.setState({
      croppedImage: croppedImage
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
    return (
      <div style={documentStyle}>
        {this.state.displaying ?
          <div>
            <ReactCrop
              crop={this.state.crop}
              src={this.state.imageUrl}
              onChange={(crop) => this.onCropChange(crop)}
              onComplete={(crop, pixelcrop) => this.onCropComplete(crop, pixelcrop)}
            />
          </div>
            :
            <FileDrop style={fileDropStyle} id="croppedImage" onDrop={(files, event) => this.handleDrop(files, event)}>Drop an image here!</FileDrop>}
      </div>
    )
  }
}

export default DocumentDisplay;
