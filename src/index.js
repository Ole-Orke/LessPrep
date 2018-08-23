import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

const documentDefaultState = {
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
  outputText: "",
  tessFinish: false,
  revealExportOptions: false,
}

const reducer = (state = documentDefaultState, action) => {
  switch (action.type) {
    case "HANDLE_FILE_DROP":
      return {
        ...state,
        imageUrl: action.data.result,
        file: action.data.file,
        displaying: true,
      }
    case "ON_CROP_CHANGE":
      return {
        ...state,
        crop: action.data.crop,
      }
    case "ON_CROP_COMPLETE":
      return {
        ...state,
        outputText: action.data.text,
        tessFinish: true,
      }
    case "SET_CROPPED_IMAGE":
      return {
        ...state,
        croppedImage: action.data.croppedImage,
        tessFinish: false
      }
    case "RESET":
      return documentDefaultState;
    case "TOGGLE_REVEAL_EXPORT":
      return {
        ...state,
        revealExportOptions: state.revealExportOptions
      }
    default:
      return state;
  }
}

const mapStateToProps = (state) => {
  return {
    imageUrl: state.imageUrl,
    file: state.file,
    displaying: state.displaying,
    crop: state.crop,
    croppedImage: state.croppedImage,
    outputText: state.outputText,
    tessFinish: state.tessFinish,
    revealExportOptions: state.revealExportOptions
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleFileDrop: (result, file) => {
    dispatch({
      type: "HANDLE_FILE_DROP",
      data: {
        result: result,
        file: file,
      }
    });
  },
  onCropChange: (crop) => {
    dispatch({
      type: "ON_CROP_CHANGE",
      data: {
        crop: crop
      }
    });
  },
  onCropComplete: (text) => {
    dispatch({
      type: "ON_CROP_COMPLETE",
      data: {
        text: text
      }
    });
  },
  setCroppedImage: (croppedImage) => {
    dispatch({
      type: "SET_CROPPED_IMAGE",
      data: {
        croppedImage: croppedImage
      }
    })
  },
  reset: () => {
    dispatch({
      type: "RESET"
    });
  }
});

const store = createStore(reducer);

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<Provider store={store} ><ConnectApp store={store}/></Provider>, document.getElementById('root'));
