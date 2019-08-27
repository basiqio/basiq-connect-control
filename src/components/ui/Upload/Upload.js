import React from "react";
import PropTypes from "prop-types";
import "./Upload.css";
import UploadIcon from "../../../assets/images/uploadCloud.svg";

class Upload extends React.Component {
  dropRef = React.createRef();
  dragCounter = 0;

  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    };
  }

  componentDidMount() {
    this.filesSelector = this.buildFileSelector({
      fileAdded: this.props.fileAdded,
      filetypes: this.props.filetypes,
      extensions: this.props.extensions,
      largeFileDropped: this.props.largeFileDropped,
      unsupportedFileDropped: this.props.unsupportedFileDropped
    });

    this.dropRef.current.addEventListener("dragenter", this.handleDragIn);
    this.dropRef.current.addEventListener("dragleave", this.handleDragOut);
    this.dropRef.current.addEventListener("dragover", this.handleDrag);
    this.dropRef.current.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    this.dropRef.current.removeEventListener("dragenter", this.handleDragIn);
    this.dropRef.current.removeEventListener("dragleave", this.handleDragOut);
    this.dropRef.current.removeEventListener("dragover", this.handleDrag);
    this.dropRef.current.removeEventListener("drop", this.handleDrop);
  }

  handleFilesSelect = e => {
    e.preventDefault();
    this.filesSelector.click();
  };

  buildFileSelector({ fileAdded, filetypes, extensions, largeFileDropped, unsupportedFileDropped }) {
    const filesSelector = document.createElement("input");
    filesSelector.setAttribute("type", "file");
    filesSelector.setAttribute("multiple", "");
    filesSelector.setAttribute("accept", filetypes);
    filesSelector.addEventListener("click", e => {
      e.target.value = null;
    })
    filesSelector.addEventListener("change", e => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.target.files;
      if (!files) {
        this.props.filesUploadAborted();
      } else {
        Array.from(files).forEach(file => {
          const fileId = Date.now();
          let extension = "";
          if(file.type === ""){
            extension = file.name.split('.').pop();
          }
          if (filetypes.includes(file.type) || extensions.includes(extension)) {
            if (file.size / 1048576 > 4.5) {
              largeFileDropped({ fileId, filename: file.name });
              return;
            }
            fileAdded({ institutionId: this.props.institutionId, statement: file, filename: file.name, fileId });
          } else {
            unsupportedFileDropped({ fileId, filetype: file.type, filename: file.name });
          }
        });
      }
    });
    return filesSelector;
  }

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ dragging: false });
    }
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let { fileAdded, filetypes, extensions, institutionId, unsupportedFileDropped, largeFileDropped } = this.props;
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => {
        const fileId = Date.now();
        let extension = "";
        if(file.type === ""){
          extension = file.name.split('.').pop();
        }
        if (filetypes.includes(file.type) || extensions.includes(extension)) {
          if (file.size / 1048576 > 4.5) {
            largeFileDropped({ fileId, filename: file.name });
            return;
          }
          fileAdded({ institutionId: institutionId, statement: file, filename: file.name, fileId });
        } else {
          unsupportedFileDropped({ fileId, filetype: file.type, filename: file.name });
        }
      });
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  render() {
    const { text, shrink } = this.props;
    if (shrink) {
      return (
        <div className="u-small-upload-wrapper">
          <div className="u-small-upload-container" ref={this.dropRef}>
            <img src={UploadIcon} alt="Upload icon" className="u-upload-icon" onClick={this.handleFilesSelect} />
          </div>
        </div>
      );
    }
    return (
      <div className="u-upload-container" ref={this.dropRef}>
        <img src={UploadIcon} alt="Upload icon" className="u-upload-icon" />
        <div className="u-ddtext">Drag &amp; Drop</div>
        <div className="u-small-grey-text">or</div>
        <div className="u-browse-button-wrapper">
          <span id="u-browse-button" onClick={this.handleFilesSelect}>
            Browse
          </span>
        </div>
        <div className="u-statements-footnote-text">{text}</div>
      </div>
    );
  }
}

Upload.propTypes = {
  fileUpload: PropTypes.func,
  text: PropTypes.string,
  filetypes: PropTypes.string,
  institutionId: PropTypes.string,
  unsupportedFileDropped: PropTypes.func,
  largeFileDropped: PropTypes.func
};

export default Upload;
