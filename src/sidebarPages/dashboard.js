import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto';
function Dashboard() {
     const chartRef = useRef(null);
     const chartInstance = useRef(null);
     const [project, setProject] = useState([])


     useEffect(() => {
          getAllProject()
          if (chartRef && chartRef.current) {
               if (chartInstance.current) {
                    chartInstance.current.destroy(); // Destroy the previous chart instance
               }

               chartInstance.current = new Chart(chartRef.current, {
                    type: 'bar',
                    data: {
                         labels: [
                              'January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'
                         ],
                         datasets: [
                              {
                                   label: `# Task completed (${12 + 19 + 3 + 5 + 2 + 3})`,
                                   data: [9, 1, 3, 1, 1, 3, 0, 15, 1, 5, 1, 3],
                                   backgroundColor: [
                                        'blue'
                                   ],
                                   borderColor: [
                                        'blue'
                                   ],
                                   borderWidth: 1,
                              },
                         ],
                    },
                    options: {
                         // Chart options
                    },
               });
          }

          return () => {
               // Clean up: destroy the chart instance when the component unmounts
               if (chartInstance.current) {
                    chartInstance.current.destroy();
               }
          };
     }, []);


     const getAllProject = async () => {
          const userName = localStorage.getItem("userName")
          const resp = await fetch(`https://my-new-8c739-default-rtdb.firebaseio.com/${userName}.json`, { method: "GET", headers: { 'Content-Type': "Application/json" } })
          if (!resp.ok) {
               throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const data = await resp.json();
          if (data) {
               const arrayOfObjects = Object.values(data);
               setProject(arrayOfObjects)
          }

     }
     return (
          <div className='row'>
               <div className='col-12 row'>

                    <div className='col-3 p-4 m-3 d-flex bg-light rounded  shadow'>
                         <small> Project</small>
                         <strong className='text-primary p-3 display-2'>{project.length}</strong>
                    </div>
                    {/* <div className='col-2'></div> */}
                    <div className='col-3 p-4 m-3 d-flex bg-light rounded  shadow'>
                         <small>Tsaks</small>
                         <strong className='text-primary p-3 display-2'>{project.length}</strong>
                    </div>
                    {/* <div className='col-2'></div> */}
                    <div className='col-3 p-4 m-3 d-flex bg-light rounded  shadow'>
                         <small>Clients </small>
                         <strong className='text-primary p-3 display-2'>{project.length}</strong>
                    </div>

               </div>
               <div className='col-12 row m-1'>

                    <div className='col-5 p-2 m-0 rounded shadow'>
                         <div class="block w-full overflow-x-auto ">
                              <table class="items-center w-full bg-transparent border-collapse">
                                   <thead>
                                        <tr>
                                             <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-light border-light-700">Project</th>
                                             <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-light border-light-700">Client's Name</th>
                                             <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-light border-light-700">Status</th>
                                             <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-light border-light-700">date </th>
                                             <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 text-light border-light-700">completion </th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {project.map((obj, index) =>
                                        (
                                             <tr>

                                                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{obj?.projectName}</td>
                                                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                       <i class="fas fa-circle text-orange-500 mr-2"></i>{obj?.clientName}</td>
                                                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                       <small className='text-white p-1 rounded' style={obj.status === 'Panding' ? { backgroundColor: 'red' } : { backgroundColor: 'blue' }}>{obj.status}</small>
                                                  </td>

                                                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                       {/* {Date(obj?.date)} */}
                                                       {Date(obj?.date).substring(0, 15)}


                                                  </td>
                                                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                       <div class="flex items-center">
                                                            <span class="mr-2">{obj?.percentage
                                                            }%</span>
                                                            <div class="relative w-full">
                                                                 <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                                                      <div style={{
                                                                           width: ` ${obj?.percentage}`
                                                                      }} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </td>

                                             </tr>
                                        )

                                        )}
                                   </tbody>
                              </table>
                         </div>

                    </div>
                    <div className='col-1'>
                    </div>
                    <div className='col-5 p-2  rounded shadow'><canvas ref={chartRef}></canvas></div>


               </div>

          </div >
     );
}

export default Dashboard;
