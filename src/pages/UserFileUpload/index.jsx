import FileUploader from "../../components/FileUploader";
import style from "./UserFileUpload.module.css";
const UserFileUpload = () => {
  return (
    <div className={style["upload-wrapper"]}>
      <div className={style["upload-holder"]}>
        <h2>Uploaded files</h2>
        <section className={style["upload-holder__section1"]}>
          <FileUploader />
        </section>
        <section className={style["upload-holder__section2"]}>
          <h4>Uploaded list</h4>
        </section>
      </div>
    </div>
  );
};

export default UserFileUpload;
