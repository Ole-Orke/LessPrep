import { connect } from "react-redux";
import App from "./App.js";

const mapStateToProps = (state) => {
  return {
    imageUrl: state.imageUrl,
    displaying: state.displaying,
    crop: state.crop,
    croppedImage: state.croppedImage,
    outputText: state.outputText,
    tessFinish: state.tessFinish,
    revealExportOptions: state.revealExportOptions
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleFileDrop: (result) => {
    dispatch({
      type: "HANDLE_FILE_DROP",
      data: {
        result: result,
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
  },
  saveTitle: (tableTitle) => {
    // console.log(tableTitle);
    dispatch({
      type: "SAVE_TITLE",
      data: {
        tableTitle: tableTitle
      }
    });
  },
  updateTable: (tableData) => {
    console.log('From Dispatcher: ', tableData);
    dispatch ({
      type: "UPDATE_TABLE",
      data: {
        tableData: tableData
      }
    });
  }
});

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectApp
