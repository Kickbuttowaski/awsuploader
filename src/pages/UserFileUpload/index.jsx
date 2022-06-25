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
        let res = await API.get("/upload/list")
        res = await res.json()
        setFileList(res.data.map(obj=>obj.Key))
    }
    fetchList()
},[])
const handleFileUpload = async()=>{
  try{
    const formData = new FormData()
    formData.append('file',uploadedFile.current)
    let res = await API.post('/upload',{body:formData})
    console.log(res,"handleFileUpload")
    res = await res.json()
    setFileList(prevList=>[...prevList,res.data])
  }
  catch(e){
    alert("Something went wrong, Please try again")
  }
 
}
  return (
    <div className={style["upload-wrapper"]}>
      <div className={style["upload-holder"]}>
        <h2>Uploaded files</h2>
        <section className={style["upload-holder__section1"]}>
          <FileUploader
            onChange={(e) => {
              const fileUploaded = e.target.files[0];
              uploadedFile.current = fileUploaded
            }}
          />
          <button onClick={handleFileUpload}>Upload</button>
        </section>
        <section className={style["upload-holder__section2"]}>
          <h4>Uploaded list</h4>
          <ul onClick={(e)=>{
            if(e.target.tagName === "LI"){
              console.log(e.target.getAttribute('data-filename'),'onClick')
            }
           
          }}>
            {fileList.map((fileName)=>{
              return <li data-filename={fileName} key={fileName}>{fileName}</li>
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserFileUpload;
