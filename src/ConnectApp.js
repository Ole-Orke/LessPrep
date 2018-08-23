import { connect } from "react-redux";
import App from "./App.js";

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

const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectApp
