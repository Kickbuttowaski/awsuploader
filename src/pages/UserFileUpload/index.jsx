import { useRef, useState, useEffect } from "react";
import API from "../../utils/api";
import FileUploader from "../../components/FileUploader";
import style from "./UserFileUpload.module.css";
const UserFileUpload = () => {
  const [uploadedFile,setUploadedFile] = useState(null)
  const [isUploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const fetchList = async function () {
      let res = await API.get("/upload/list");
      res = await res.json();
      setFileList(res.data.map((obj) => obj.Key));
    };
    fetchList();
  }, []);
  const handleFileUpload = async () => {
    try {
      setUploading(true)
      const formData = new FormData();
      formData.append("file", uploadedFile);
      let res = await API.post("/upload", { body: formData });
      res = await res.json();
      setFileList((prevList) => [...prevList, res.data]);
      setUploadedFile(null)
      setUploading(false)
    } catch (e) {
      alert("Something went wrong, Please try again");
      setUploading(false)
    }
  };
  const handleFileDownload = async (fName) => {
    try {
      let res = await API.get("/upload/get?filename=" + fName);
      res = await res.blob()
      var url = window.URL.createObjectURL(res);
      var a = document.createElement('a');
      a.href = url;
      a.download = fName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();    
      a.remove();
    } catch (e) {
      console.log(e, "download");
      //alert("Something went wrong, Please try again")
    }
  };
  const handleChooseFile = (e) => {
    const fileUploaded = e.target.files[0];
    setUploadedFile(fileUploaded)
  };
  const isDisabled = ()=>{
    return isUploading || uploadedFile ===null
  }
  return (
    <div className={style["upload-wrapper"]}>
      <div className={style["upload-holder"]}>
        <h2>Uploaded files</h2>
        <section className={style["upload-holder__section1"]}>
          <FileUploader onChange={handleChooseFile} />
          <button
            className={style[!isDisabled()?'upload__button':'upload__button--disabled']}
            onClick={handleFileUpload}
          >
            {isUploading?"Uploading...":"Upload"}
          </button>
        </section>
        <section className={style["upload-holder__section2"]}>
          <h4>Uploaded list</h4>
          <ul
            onClick={(e) => {
              if (e.target.tagName === "LI") {
               handleFileDownload(e.target.getAttribute("data-filename"));
                //console.log(e.target.getAttribute('data-filename'),'onClick')
              }
            }}
          >
            {fileList.map((fileName) => {
              return (
                <li data-filename={fileName} key={fileName}>
                  {fileName}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserFileUpload;
