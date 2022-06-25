import { useRef, useState,useEffect } from "react";
import API from "../../utils/api";
import FileUploader from "../../components/FileUploader";
import style from "./UserFileUpload.module.css";
const UserFileUpload = () => {
  const uploadedFile = useRef(null);
  const [isUploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  useEffect(()=>{
    const fetchList= async function(){
        let res = await API.post("/upload/list")
        res = await res.json()
        setFileList(res.data)
        console.log(res.data,"API")  
    }
    fetchList()
},[])
  return (
    <div className={style["upload-wrapper"]}>
      <div className={style["upload-holder"]}>
        <h2>Uploaded files</h2>
        <section className={style["upload-holder__section1"]}>
          <FileUploader
            onChange={(e) => {
              const fileUploaded = e.target.files[0];
            }}
          />
          <button>Upload</button>
        </section>
        <section className={style["upload-holder__section2"]}>
          <h4>Uploaded list</h4>
          <ul>
            {fileList.map((fileObj)=>{
              return <li key={fileObj.Key}>{fileObj.Key}</li>
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserFileUpload;
