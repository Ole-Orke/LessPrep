import React, { Component } from 'react';
import FileDrop from "react-file-drop";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from "semantic-ui-react";
import Script from "react-load-script";
import GooglePicker from "react-google-picker";

const Tesseract = window.Tesseract;

class DocumentDisplay extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleDrop(files, event) {
    let reader = new FileReader();
    let file = files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let image = new Image();
      image.src = reader.result;
      this.props.handleFileDrop(reader.result);
    }
  }

  onCropChange(crop) {
    this.props.onCropChange(crop);
    console.log("Store:", this.props.store.getState());
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
    const croppedImage = this.getCroppedImg(this.props.store.getState().imageUrl, pixelcrop, "outputImage");
    this.props.setCroppedImage(croppedImage);
    Tesseract.recognize(croppedImage)
      .then((result) => {
        console.log(result.text);
        this.props.onCropComplete(result.text);
      });
  }

  handleScriptLoad = () => {
    console.log("Script loaded!");
  }

  handleGoogleDriveChange(data) {
    if (data.action === "picked") {
      console.log("url:", data.docs[0].url);
      this.props.handleFileDrop(data.docs[0].url);
    }
  }

  render() {
    const documentStyle = {
      height: "88vh",
      padding: 0,
      margin: 0,
      display: "flex",
      flex: 1,
      justifyContent: "center",
      overflow: "auto",
      textAlign: "center"
    }
    const fileDropStyle = {
      height: "100%",
      width: "100%",
    }
    return (
      <div style={documentStyle}>
    {/*    <Script
          url="https://apis.google.com/js/api.js?onload=onApiLoad"
          onLoad={() => this.handleScriptLoad()}
        />*/}
        {this.props.store.getState().displaying ?
          <div>
            <ReactCrop
              style={this.props.store.getState().tessFinish ? {border: "3px solid green"} : {border: "3px solid red"}}
              crop={this.props.store.getState().crop}
              src={this.props.store.getState().imageUrl}
              onChange={(crop) => this.onCropChange(crop)}
              onComplete={(crop, pixelcrop) => this.onCropComplete(crop, pixelcrop)}
            />
          </div>
            :
            <FileDrop style={fileDropStyle} id="croppedImage" onDrop={(files, event) => this.handleDrop(files, event)}>Drop an image here, or upload from: <GooglePicker
              clientId={process.env.REACT_APP_CLIENT_ID}
                  developerKey={process.env.REACT_APP_DEVELOPER_KEY}
                  scope={['https://www.googleapis.com/auth/photos']}
                  onChange={(data) => this.handleGoogleDriveChange(data)}
                  onAuthenticate={token => console.log('oauth token:', token)}
                  multiselect={false}
                  navHidden={true}
                  authImmediate={true}
                  mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                  viewId={'PHOTOS'}
              >
              <Button>Google Drive</Button>
            </GooglePicker></FileDrop>}
      </div>
    )
  }
}

export default DocumentDisplay;
