import style from "./FileUploader.module.css"
const FileUploader = ({onChange}) => {
  return <input type="file" onChange={onChange} />;
};

export default FileUploader;
