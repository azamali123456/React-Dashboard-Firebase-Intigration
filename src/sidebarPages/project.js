import React, { useState, useEffect, CSSProperties } from 'react'
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import ClipLoader from "react-spinners/ClipLoader";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
function Projects({ project = () => { }, pageAccess }) {

     const firebaseConfig = {
          apiKey: "AIzaSyAPagJM3rK7wN2eg5vozwTXZ3O8NqlV5c8",
          authDomain: "my-new-8c739.firebaseapp.com",
          projectId: "my-new-8c739",
          storageBucket: "my-new-8c739.appspot.com",
          messagingSenderId: "389170420308",
          appId: "1:389170420308:web:7ddbf0415543494998abc1"
     }
     const app = initializeApp(firebaseConfig)
     const storage = getStorage(app);
     const [projectName, setProjectName] = useState()
     const [discription, setDiscription] = useState()
     const [skelten, setSkelten] = useState(false)
     const navigate = useNavigate()
     const [folder, setFolder] = useState([])
     const [folderId, setFolderId] = useState([])


     const submit = async () => {
          const userName = localStorage.getItem("userName")
          const body = { projectName: projectName, discription: discription, edited: 'false', verify: 'false', projectToken: userName }
          const resp = await fetch(`https://my-new-8c739-default-rtdb.firebaseio.com/${userName}.json`, { method: "POST", headers: { 'Content-Type': "Application/json" }, body: JSON.stringify(body) })
          if (!resp.ok) {
               throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const data = await resp.json();
     }
     useEffect(() => {
          getAllProject()
     }, [])
     const getAllProject = async () => {
          const userName = localStorage.getItem("userName")
          const resp = await fetch(`https://my-new-8c739-default-rtdb.firebaseio.com/${userName}.json`, { method: "GET", headers: { 'Content-Type': "Application/json" } })
          if (!resp.ok) {
               throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const data = await resp.json();
          if (data) {
               const arrayOfObject = Object.keys(data);
               let newArray = [];
               for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                         const newObj = data[key];
                         newObj.id = key;
                         newArray.push(newObj);
                    }
               }
               setFolderId(arrayOfObject)
               getAllTask(arrayOfObject, newArray)
          }
     }
     const deleteProject = async (key) => {
          notify()
          const userName = localStorage.getItem("userName")
          const url = `https://my-new-8c739-default-rtdb.firebaseio.com/${userName}/${key}.json`;
          try {
               const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                         'Content-Type': 'application/json'
                    }
               });

               if (response.ok) {
                    console.log('User data deleted successfully.');
               } else {
                    console.error('Failed to delete user data:', response.statusText);
               }
          } catch (error) {
               console.error('Error deleting user data:', error);
          }

     }
     const notify = () => {
          toast.info("This Project has been deleted Now!", {
               position: toast.POSITION.TOP_RIGHT
          });
     };
     const getAllTask = (folderIds, newArray) => {
          for (let x = 0; x < folderIds.length; x++) {
               const storageRef = ref(storage, folderIds[x]);
               listAll(storageRef)
                    .then(async (res) => {
                         const data = []
                         for (const fileRef of res.items) {
                              const downloadURL = await getDownloadURL(fileRef);
                              const originalName = fileRef.name;
                              data.push(downloadURL)
                         }

                         newArray[x].url = data
                    })
                    .catch((err) => console.log(err));
          }
          if (newArray) {
               console.log(newArray, "newArray")
               setFolder(newArray)
               setSkelten(true)
          }

     }

     useEffect(() => {
          console.log(folder, 'folfer')
     }, [folder])
     const override = {
          display: "block",
          margin: "0 auto",
          borderColor: "#0d6efd",
     };
     return (
          <div className=' d-flex row  '>
               {folder && skelten ? <>
                    {folder?.map((file, index) => (
                         <>
                              <div className='row col-md-3 m-5  p-3 project ' title={file.projectName} >

                                   <div className='col-sm-12 d-flex'>
                                        <div className='col-6'>
                                             <h6 style={{ color: "white", fontFamily: "fantasy", fontSize: "20px", position: "relative", }}>{file.projectName}</h6>
                                        </div>
                                        <div className='col-6'>
                                             <svg onClick={() => { deleteProject(folderId[index]) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" style={{ color: "red", padding: '5px', border: '2px solid white', borderRadius: "20px", width: '30px', height: '30px', position: 'relative', left: '6rem' }} >
                                                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                             </svg>
                                        </div>

                                   </div>
                                   <div className='col-sm-12 d-flex' onClick={() => { project(folderId[index]); navigate(folderId[index]); localStorage.setItem("folderId", folderId[index]) }}>
                                        <h1 className='example1' style={{ zIndex: 1 }} >{index + 1}</h1>
                                        <span>
                                             <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 mt-4">
                                                  <div class="flex">
                                                       {file?.url ? <> {file?.url?.map((img, ind) => (
                                                            <img src={img} alt="..." class="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow delay-3000" />
                                                       ))}</> : null}
                                                  </div>
                                             </td>

                                        </span>



                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="currentColor" class="bi bi-card-image m-3" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                   </svg> */}
                                        <hr />
                                   </div>
                                   <small style={{ zIndex: '0', color: "white", fontFamily: "sans-serif", overflow: "hidden", backgroundColor: "rgba(0, 0, 0, 0.7)", fontSize: "12px", position: "relative", top: "-100px", overflowY: 'hidden', }}>{file.discription}</small>

                              </div>
                         </>
                    ))}</> :
                    <ClipLoader
                         // color={"#ffffff"}
                         loading={true}
                         cssOverride={override}
                         size={50}
                         MoonLoader={30}
                         RotateLoader={15}
                    />

               }



          </div>
     );
}

export default Projects;
