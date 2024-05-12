
import './App.css';
import React, { useEffect, useState } from 'react'
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Project from './pages/project';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  const [pageAccess, SetPageAccess] = useState()

  const project = (file) => {
    SetPageAccess(file)
  }
  useEffect(() => {
    console.log(pageAccess)
    SetPageAccess(localStorage.getItem("folderId"))

  }, [pageAccess])
  return (

    <BrowserRouter >
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path={`/home/${pageAccess ? pageAccess : '1'}`} element={<Project />} />
        <Route exact path='/home' element={<Home project={project} pageAccess={pageAccess} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
