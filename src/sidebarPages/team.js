import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function Team() {
     const [state, setState] = useState(false)
     useEffect(() => {
          setState(true)
          setTimeout(() => {
               setState(false)
          }, 1000);
     }, [1000])
     const override = {
          display: "block",
          margin: "0 auto",
          borderColor: "#0d6efd",
     };

     return (
          <div>

               {state ? <ClipLoader
                    // color={"#ffffff"}
                    loading={true}
                    cssOverride={override}
                    size={50}
                    MoonLoader={30}
                    RotateLoader={15}
               /> : <h5> This is Team & Refferal Page</h5>}

          </div>
     );
}

export default Team;
