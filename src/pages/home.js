import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ReaclTimeDataBase from '../Componenets/realTimedatabase';
function Home({ project, pageAccess }) {
     const navigate = useNavigate()
     useEffect(() => {
          const token = localStorage.getItem("token")
          if (!token) {
               navigate("/")
          }
     })
     return (
          <div >
               <ReaclTimeDataBase project={project} pageAccess={pageAccess} />
          </div>
     );
}

export default Home;
