import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function FirebaseAuthentication() {

     const firebaseConfig = {
          apiKey: "AIzaSyAPagJM3rK7wN2eg5vozwTXZ3O8NqlV5c8",
          authDomain: "my-new-8c739.firebaseapp.com",
          projectId: "my-new-8c739",
          storageBucket: "my-new-8c739.appspot.com",
          messagingSenderId: "389170420308",
          appId: "1:389170420308:web:7ddbf0415543494998abc1"
     };
     // Initialize Firebase
     const ForError = () => toast("Conguralation You Are Successfully Registered", { autoClose: 7000 });
     const app = initializeApp(firebaseConfig);
     const auth = getAuth(app)
     const [name, setName] = useState()
     const [email, setEmail] = useState()
     const [password, setPassword] = useState()
     const [pageState, setPageState] = useState("Signup")
     const onSubmit = async () => {
          ForError()
          createUserWithEmailAndPassword(auth, email, password, name).then((res) => {
               console.log(res)

               toast.success("Conguralation You Are Successfully Registered")
               ForError()

          }).catch((err) => {

               ForError()

          })
     }
     const onSubmitLogin = async () => {
          signInWithEmailAndPassword(auth, email, password).then((res) => {
               console.log(res)
          }).catch((err) => {
               console.log(err)
          })

     }
     const changePageState = (page) => {
          if (page === "Signup")
               setPageState("Signup")
          else {
               setPageState("Login")
          }
     }
     return (
          <div className="">
               {/*  Signup Page */}
               {pageState === "Signup" ? <>
                    <div>
                         <div class="container">
                              <div class="card">
                                   <div class="card-image">
                                        <h2 class="card-heading">
                                             Get started
                                             <small> Let us create your account</small>
                                        </h2>
                                   </div>

                                   <div class="input">
                                        <input type="text" class="input-field" name='name' onChange={(e) => setName(e.target.value)} required />
                                        <label class="input-label">Full name</label>
                                   </div>
                                   <div class="input">
                                        <input type="text" class="input-field" name='email' onChange={(e) => setEmail(e.target.value)} required />
                                        <label class="input-label">Email</label>
                                   </div>
                                   <div class="input">
                                        <input type="password" class="input-field" onChange={(e) => setPassword(e.target.value)} required />
                                        <label class="input-label">Password</label>
                                   </div>
                                   <div class="action">
                                        <button class="action-button" onClick={() => onSubmit()}>Signup</button>
                                   </div>

                                   <div class="card-info">
                                        <p>All ready have an <a href="#" onClick={() => changePageState("Login")}>account</a></p>
                                   </div>
                              </div>
                         </div>
                    </div></> :
                    // Login Page
                    <div class="container">
                         <div class="card">
                              <div class="card-image1">
                                   <h2 class="card-heading" style={{ color: "#6658d3" }}>
                                        Take A Step
                                        <small> with us makes profitable journey</small>
                                   </h2>
                              </div>


                              <div class="input" style={{ marginTop: '5px' }}>
                                   <input type="text" class="input-field" onChange={(e) => setEmail(e.target.value)} required />
                                   <label class="input-label">Email</label>
                              </div>
                              <div class="input">
                                   <input type="password" class="input-field" onChange={(e) => setPassword(e.target.value)} required />
                                   <label class="input-label">Password</label>
                              </div>
                              <div class="action">
                                   <button class="action-button" onClick={onSubmitLogin}>Login</button>
                              </div>

                              <div class="card-info">
                                   <p>Don't have an account go  <a href="#" onClick={() => changePageState("Signup")}>Signup</a></p>
                              </div>
                         </div>
                    </div>

               }






          </div>
     );
}

export default FirebaseAuthentication;
