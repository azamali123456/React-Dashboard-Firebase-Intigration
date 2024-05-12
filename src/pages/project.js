import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { FirebaseConfiguration } from '../firebaseConfiguration/config'
import FirebaseStorage from '../Componenets/firebaseStorage';
import PhotoEdit from '../pages/photoEdit'
function Project() {

     const navigate = useNavigate()
     const firebaseConfig = {
          apiKey: "AIzaSyAPagJM3rK7wN2eg5vozwTXZ3O8NqlV5c8",
          authDomain: "my-new-8c739.firebaseapp.com",
          projectId: "my-new-8c739",
          storageBucket: "my-new-8c739.appspot.com",
          messagingSenderId: "389170420308",
          appId: "1:389170420308:web:7ddbf0415543494998abc1"
     };
     // Initialize Firebase
     const [email, setEmail] = useState()
     const [password, setPassword] = useState()
     const auth = FirebaseConfiguration();
     const onSubmitLogin = async () => {
          signInWithEmailAndPassword(auth, email, password).then((res) => {
               localStorage.setItem("token", res.user.accessToken)
               localStorage.setItem("userName", res.user.email.split('@')[0])

               if (res) {
                    navigate("/home")
               }
          }).catch((err) => {
               console.log(err)
          })

     }

     return (
          <div >
               <PhotoEdit />
               
          </div>
     );
}

export default Project;
