import React, { useState, useEffect } from 'react'
import '../App.css';
import '../styles/realtimedatabase.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Projects from '../sidebarPages/project';
import SubHome from '../sidebarPages/subhome';
import Dashboard from '../sidebarPages/dashboard';
import Customers from "../sidebarPages/customer"
import Team from '../sidebarPages/team';

function ReaclTimeDataBase({ project = () => { }, pageAccess }) {
     const userName = localStorage.getItem('userName')
     const navigate = useNavigate()
     const [projectName, setProjectName] = useState()
     const [discription, setDiscription] = useState()
     const [client, setClient] = useState()

     const [page, setPage] = useState('Home')
    
     useEffect(() => {
          getAllProject()
     }, [])
      // Create New Project
      const submit = async () => {
          const userName = localStorage.getItem("userName")
          const body = { projectName: projectName, discription: discription, date: new Date(), projectToken: userName, clientName: client, status: 'Panding', percentage: 0 }
          const resp = await fetch(`https://my-new-8c739-default-rtdb.firebaseio.com/${userName}.json`, { method: "POST", headers: { 'Content-Type': "Application/json" }, body: JSON.stringify(body) })
          if (!resp.ok) {
               throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const data = await resp.json();
     }
     // Get All Projects
     const getAllProject = async () => {
          const userName = localStorage.getItem("userName")
          const resp = await fetch(`https://my-new-8c739-default-rtdb.firebaseio.com/${userName}.json`, { method: "GET", headers: { 'Content-Type': "Application/json" } })
          if (!resp.ok) {
               throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const data = await resp.json();
          if (data) {
               const arrayOfObjects = Object.values(data);
               const arrayOfObject = Object.keys(data);
               // setFolder(arrayOfObjects)
               // setFolderId(arrayOfObject)
               // setTimeout(function () {
               //      setSkelten(true)
               // }, 2000);
          }

     }
     // Sign Out
     const logOut = () => {
          localStorage.removeItem("token")
          navigate('/')
     }
     return (
          <>
               <div className="  row ">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-[#eeeeee] text-[#555555]">
                         <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                              <a href="#" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                   <span class="fs-5 d-none d-sm-inline text-dark">PhotoEditor#</span>
                              </a>
                              <div class=" pb-4 ">

                                   <a href="#" class="bg-primary d-flex align-items-center text-white text-decoration-none " id="dropdownUser1" style={{ width: '110%', border: '1px solid white', borderBottomRightRadius: '20px', borderTopRightRadius: '20px', position: 'relative', left: '-15px' }}  >
                                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle m-1" />
                                        <div className=''>
                                             <strong className='text-white'>Welcome!</strong> <small class="d-none d-sm-inline mx-1 text-light">{userName}</small>
                                        </div>
                                   </a>

                              </div>
                              <ul class="nav  nav-pills flex-column ml-4  " style={{ width: '104.5%', overflow: 'hidden', }} >
                                   <li className=" sidebar_button " onClick={() => { setPage('Home') }} >
                                        <a href="#" class="nav-link align-middle  d-flex ">
                                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-house m-[1.8]" viewBox="0 0 16 16">
                                                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                             </svg> <strong className='ml-1'>Home</strong>
                                        </a>
                                   </li>
                                   <li className='sidebar_button '>
                                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link d-flex align-middle" onClick={() => { setPage('Dashboard') }}>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-speedometer2 m-[1.8]" viewBox="0 0 16 16">
                                                  <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                                                  <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
                                             </svg> <strong className='ml-1'>Dashboard</strong> </a>

                                   </li>
                                   <li className='sidebar_button '>
                                        <a href="#" class="nav-link d-flex align-middle" onClick={() => { setPage('Projects') }}>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-kanban m-[1.8]" viewBox="0 0 16 16">
                                                  <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                  <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" />
                                             </svg> <strong className='ml-1'>Projects</strong> </a>
                                   </li>

                                   <li className='sidebar_button '>
                                        <a href="#submenu3" data-bs-toggle="collapse" class="nav-link d-flex align-middle" onClick={() => { setPage('Customers') }}>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill m-[1.8]" viewBox="0 0 16 16">
                                                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                             </svg> <strong class="ms-1 ">Customers</strong> </a>

                                   </li>
                                   <li className='sidebar_button '>
                                        <a href="#" class="nav-link d-flex align-middle" onClick={() => { setPage('Team') }}>
                                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-microsoft-teams m-[1.8]" viewBox="0 0 16 16">
                                                  <path d="M9.186 4.797a2.42 2.42 0 1 0-2.86-2.448h1.178c.929 0 1.682.753 1.682 1.682zm-4.295 7.738h2.613c.929 0 1.682-.753 1.682-1.682V5.58h2.783a.7.7 0 0 1 .682.716v4.294a4.197 4.197 0 0 1-4.093 4.293c-1.618-.04-3-.99-3.667-2.35Zm10.737-9.372a1.674 1.674 0 1 1-3.349 0 1.674 1.674 0 0 1 3.349 0m-2.238 9.488c-.04 0-.08 0-.12-.002a5.19 5.19 0 0 0 .381-2.07V6.306a1.692 1.692 0 0 0-.15-.725h1.792c.39 0 .707.317.707.707v3.765a2.598 2.598 0 0 1-2.598 2.598h-.013Z" />
                                                  <path d="M.682 3.349h6.822c.377 0 .682.305.682.682v6.822a.682.682 0 0 1-.682.682H.682A.682.682 0 0 1 0 10.853V4.03c0-.377.305-.682.682-.682Zm5.206 2.596v-.72h-3.59v.72h1.357V9.66h.87V5.945h1.363Z" />
                                             </svg><strong class="ms-1 ">Team & Ref</strong> </a>
                                   </li>
                              </ul>
                              <hr />

                         </div>
                    </div>
                    <div class="col  " >
                         <div className="row bg-dark " style={{ height: '4rem' }} >
                              <div className='col-sm-4'>
                                   <button type="button" style={{ position: "fixed" }} class="btn btn-light mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        New Project +
                                   </button>
                              </div>
                              <div className='col-sm-5'>
                              </div>

                              <div className='col-sm-3' >
                                   <a onClick={() => { logOut() }} className='text-white ' style={{ cursor: "pointer" }}>Sign out</a>
                              </div>



                              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                   <div class="modal-dialog">
                                        <div class="modal-content">
                                             <div class="modal-header">
                                                  <h5 class="modal-title" id="exampleModalLabel">Create Directory
                                                  </h5>
                                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                             </div>
                                             <div class="modal-body">

                                                  <div class="mb-3">
                                                       <label for="exampleInputEmail1" class="form-label">Name</label>
                                                       <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setProjectName(e.target.value) }} />
                                                  </div>
                                                  <div class="mb-3">
                                                       <label for="exampleInputPassword1" class="form-label">Client's Name</label>
                                                       <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => { setClient(e.target.value) }} />
                                                  </div>
                                                  <div class="mb-3">
                                                       <label for="exampleInputPassword1" class="form-label">Discription</label>
                                                       <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => { setDiscription(e.target.value) }} />
                                                  </div>



                                             </div>
                                             <div class="modal-footer">
                                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => submit()}>Save changes</button>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                         </div>
                         <div className='mt-3 p-2 bg-white'>
                              {page === "Projects" ? <Projects project={project} pageAccess={pageAccess} />
                                   : page === "Home" ? <SubHome /> : page === "Dashboard" ? <Dashboard /> : page === "Customers" ? <Customers /> : page === "Team" ? <Team /> : null}
                         </div>
                    </div>
               </div>
          </>
     );
}

export default ReaclTimeDataBase;
