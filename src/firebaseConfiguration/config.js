import React from 'react'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export function FirebaseConfiguration() {
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
     const app = initializeApp(firebaseConfig);
     const auth = getAuth(app)


     return auth

}


