import style from "./FileUploader.module.css";
const FileUploader = ({ onChange }) => {
  return (
    <div>
      <input type="file" onChange={onChange} />
    </div>
  );
};

export default FileUploader;
