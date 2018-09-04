import React from 'react';
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import App from './App.js';

const documentDefaultState = {
  imageUrl: "",
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
  tableTitle:"",
  tableData: [],
}

const reducer = (state = documentDefaultState, action) => {
  switch (action.type) {
    case "HANDLE_FILE_DROP":
      return {
        ...state,
        imageUrl: action.data.result,
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
      case "SAVE_TITLE":
      return {
        ...state,
        tableTitle: action.data.tableTitle,
      }
      case "UPDATE_TABLE":
      return {
        ...state,
        tableData: action.data.tableData,
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
