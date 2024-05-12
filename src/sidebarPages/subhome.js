import React, { useState, useEffect, useRef } from 'react'
import '../styles/realtimedatabase.css'
function SubHome() {

     return (
          <div>
               <div id="carouselExample" class="carousel slide " >
                    <div class="carousel-inner ">
                         <div class="carousel-item active " style={{ height: '10rem', width: '99%' }}>
                              <img src="https://up.yimg.com/ib/th?id=OIP.rvSWtRd_oPRTwDoTCmkP5gHaE8&%3Bpid=Api&rs=1&c=1&qlt=95&w=173&h=115" class="d-block w-100 rounded" alt="..." />
                         </div>
                         <div class="carousel-item" style={{ height: '10rem', width: '99%' }}>
                              <img src="https://up.yimg.com/ib/th?id=OIP.rvSWtRd_oPRTwDoTCmkP5gHaE8&%3Bpid=Api&rs=1&c=1&qlt=95&w=173&h=115" class="d-block w-100 rounded" alt="..." />
                         </div>
                         <div class="carousel-item" style={{ height: '10rem', width: '99%' }}>
                              <img src="https://up.yimg.com/ib/th?id=OIP.rvSWtRd_oPRTwDoTCmkP5gHaE8&%3Bpid=Api&rs=1&c=1&qlt=95&w=173&h=115" class="d-block w-100 rounded" alt="..." />
                         </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                         <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                         <span class="carousel-control-next-icon" aria-hidden="true"></span>
                         <span class="visually-hidden">Next</span>
                    </button>
               </div>
               <div class="row">
                    <div class="col-sm-4 mb-3 mb-sm-0">
                         <div class="card">
                              <div class="card-body">
                                   <h5 class="card-title">Special title treatment</h5>
                                   <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                              </div>
                         </div>
                    </div>
                    <div class="col-sm-4">
                         <div class="card">
                              <div class="card-body">
                                   <h5 class="card-title">Special title treatment</h5>
                                   <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                              </div>
                         </div>
                    </div>
                    <div class="col-sm-4">
                         <div class="card">
                              <div class="card-body">
                                   <h5 class="card-title">Special title treatment</h5>
                                   <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                   <a href="#" class="btn btn-primary">Go somewhere</a>
                              </div>
                         </div>
                    </div>
               </div>


          </div>
     );
}

export default SubHome;
