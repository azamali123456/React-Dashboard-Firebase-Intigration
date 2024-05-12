import { useState, useEffect } from "react";
import { ref, listAll, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import '../styles/firebase.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function FirebaseStorage({ setEditFile }) {
     const firebaseConfig = {
          apiKey: "AIzaSyAPagJM3rK7wN2eg5vozwTXZ3O8NqlV5c8",
          authDomain: "my-new-8c739.firebaseapp.com",
          projectId: "my-new-8c739",
          storageBucket: "my-new-8c739.appspot.com",
          messagingSenderId: "389170420308",
          appId: "1:389170420308:web:7ddbf0415543494998abc1"
     }
     // Firebase storage reference
     const app = initializeApp(firebaseConfig)
     const storage = getStorage(app);
     const [file, setFile] = useState("");
     const [fileName, setFileName] = useState("");
     const [percent, setPercent] = useState(-1);
     const [files, setFiles] = useState([]);
     function handleChange(event) {
          console.log(event.target.files[0])
          const fileSize = event.target.files[0].size; // Get the size of the selected file
          setFileName(event.target.files[0].name)
          setFile(event.target.files[0]);
     }
     const handleUpload = () => {
          if (!file) {
               toast.info("You dosen't select any photo!", {
                    position: toast.POSITION.TOP_RIGHT
               });
          }
          else {
               const projectId = localStorage.getItem("folderId")
               console.log(file.name,"file.name")
               const storageRef = ref(storage, `/${projectId}/${file.name}`);
               const uploadTask = uploadBytesResumable(storageRef, file);
               uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                         const percent = Math.round(
                              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                         );
                         setPercent(percent);
                    },
                    (err) => console.log(err),
                    () => {
                         // download url
                         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                              toast.success("Your image has been uploaded successfully!", {
                                   position: toast.POSITION.TOP_RIGHT
                              });
                              setPercent(-1)

                              const projectId = localStorage.getItem("folderId")
                              const storageRef = ref(storage, `${projectId}`);
                              listAll(storageRef)
                                   .then(async (res) => {

                                        const fileData = [];
                                        for (const fileRef of res.items) {
                                             const downloadURL = await getDownloadURL(fileRef);
                                             const name = fileRef.name;
                                             const originalName = fileRef.name; // Get the original name of the image
                                             const shortenedName = await shortenFileName(originalName);
                                             fileData.push({ ref: fileRef, downloadURL, name: shortenedName });
                                        }

                                        setFiles(fileData.reverse());
                                        setPercent(0)
                                   })
                                   .catch((err) => console.log(err));
                         });
                    }
               );
          }

     };
     useEffect(() => {
          const projectId = localStorage.getItem("folderId")
          const storageRef = ref(storage, `${projectId}`);
          listAll(storageRef)
               .then(async (res) => {

                    const fileData = [];
                    for (const fileRef of res.items) {
                         const downloadURL = await getDownloadURL(fileRef);
                          console.log(downloadURL, 'downloadURL')
                         const name = fileRef.name;
                         const originalName = fileRef.name; // Get the original name of the image
                         const shortenedName = await shortenFileName(originalName);
                         fileData.push({ ref: fileRef, downloadURL, name: shortenedName });
                    }

                    setFiles(fileData.reverse());
               })
               .catch((err) => console.log(err));
     }, []);
     async function shortenFileName(originalName) {
          const maxFileNameLength = 20; // You can adjust this value to your preference
          if (originalName.length <= maxFileNameLength) {
               return originalName; // If the name is already short, return it as is
          }

          // Split the file name into parts (before and after the extension)
          const parts = originalName.split('.');
          if (parts.length !== 2) {
               return originalName; // If the name doesn't have an extension, return it as is
          }

          const [nameWithoutExtension, extension] = parts;
          const maxCharsBeforeExtension = Math.floor((maxFileNameLength - 5) / 2); // 5 characters reserved for '...' and the last few characters
          const shortenedName =
               nameWithoutExtension.slice(0, maxCharsBeforeExtension) + '...' + nameWithoutExtension.slice(-maxCharsBeforeExtension) + '.' + extension;

          return shortenedName;
     }
     const [open, setOpen] = useState(false);

     const toggleDrawer = () => {
          setOpen(!open);
     };
     return (
          <div >
               <ToastContainer />
               <div>
                    <button className=" bg-dark text-white p-2 m-2 d-flex" type="button" onClick={() => { setOpen(true) }}>
                         Gallery   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
                              <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                         </svg>
                    </button>
                    <div className={`drawer ${open ? 'open' : ''}`}>
                         <nav className="navbar  position-sticky " style={{ position: 'sticky', background: "rgba(0, 0, 0, 0.6)" }} >
                              <button className="  text-white p-2 m-2" onClick={toggleDrawer}>
                                   {/* <span className="navbar-toggler-icon"></span> */}
                                   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                                        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                                   </svg>
                              </button>
                              <h5 style={{ color: "white", position: "relative", left: "-25%" }}>
                                   Your Gallery
                              </h5>
                         </nav>
                         <div className="drawer-content ">
                              <div className="container" style={{
                                   width: '16.8rem',
                                   height: '8rem',
                                   zIndex: 1,
                                   // background: 'linear-gradient(black 30%, transparent 110%)',
                                   top: '0rem',
                                   left: '1.0rem',
                                   // position: "fixed"
                              }}>
                                   <div className="d-flex bg-dark   ">
                                        <div class="upload-btn-wrapper   d-flex ">
                                             <button class="button" >{fileName ? fileName : 'Drop A New File'} </button>
                                             <input type="file" name="myfile" onChange={handleChange} accept=".png, .jpg, .jpeg" />
                                        </div>
                                        <svg onClick={handleUpload} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-upload  text-white  m-3" viewBox="0 0 16 16">
                                             <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                             <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                        </svg>
                                   </div>
                                   {percent > 0 && percent < 100 ?
                                        <div style={{ position: 'relative', top: "0.2rem", display: 'flex', color: 'black' }}>
                                             <small>{percent} "% done"</small>
                                             <progress value={percent}>{percent} "% done"</progress>
                                        </div> : null}
                              </div>

                              <ul style={{ position: "relative", top: "-40px", }}>
                                   {files.length > 0 ? < div > {
                                        files.map((file, index) => (
                                             <div onClick={() => setEditFile(file)} className="mt-2 " style={{ zIndex: "0" }}>
                                                  {file.downloadURL && (
                                                       <div class="select-image">
                                                            <img className="image" src={file.downloadURL} alt="Thumbnail Image" />
                                                            <div class="popup">
                                                                 <small>{file.name}</small>
                                                            </div>
                                                       </div>
                                                  )}
                                             </div>
                                        ))
                                   }</div> : <div className="mt-2">
                                        <div class="flex items-center justify-center h-36 mb-4 bg-gray-300 rounded dark:bg-gray-700 col-sm-4 w-100">
                                             <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                             </svg>
                                        </div></div>}

                              </ul>
                         </div>
                    </div>

               </div >
          </div >
     );
}

export default FirebaseStorage;
