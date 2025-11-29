import { FaTasks } from 'react-icons/fa'
import api from '../API/api'
import { useEffect, useState } from 'react'

const Carousel =()=>{
  
    return(
        <div>
             <h2 className='mt-3 text-center fw-bold'>Recent Tasks</h2>

      {/* Carousel */}
      <div id="mycarousel" className="carousel slide mt-3" data-bs-ride="carousel">
                {/* DOT INDICATORS */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#mycarousel" data-bs-slide-to="3"></button>
          </div>
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
           <div className="d-flex justify-content-center gap-3">


              <div className="col-12 col-md-6 col-lg-3 mb-3">

              <div className="card shadow card-hover" style={{ width: '18rem' }}>
                <div className="card-body">
                  <p className='fw-bold'><FaTasks className='me-2'/> Project 1</p>
                  <h4>Frontend Integration</h4>
                  <p>React + Vite + Bootstrap UI Development</p>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3 mb-3">

              <div className="card shadow card-hover" style={{ width: '18rem' }}>
                <div className="card-body">
                  <p className='fw-bold'><FaTasks className='me-2'/> Project 2</p>
                  <h4>Backend API</h4>
                  <p>Node.js + Express CRUD Operations</p>
                </div>
              </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3 mb-3">

              <div className="card shadow card-hover" style={{ width: '18rem' }}>
                <div className="card-body">
                  <p className='fw-bold'><FaTasks className='me-2'/> Project 3</p>
                  <h4>Auth System</h4>
                  <p>JWT Authentication & Token Handling</p>
                </div>
              </div>
              </div>

             

            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="d-flex justify-content-center gap-3">

              <div className="col-12 col-md-6 col-lg-3 mb-3">

              <div className="card shadow card-hover" style={{ width: '18rem' }}>
                <div className="card-body">
                  <p className='fw-bold'><FaTasks className='me-2'/> Project 4</p>
                  <h4>UI Dashboard</h4>
                  <p>Bootstrap Professional Layout Design</p>
                </div>
              </div>
              </div>

              

            </div>
          </div>

             

         
        </div>

        {/* Prev / Next Buttons */}
        <button className='carousel-control-prev' type='button' data-bs-target='#mycarousel' data-bs-slide='prev'>
          <span className='carousel-control-prev-icon'></span>
        </button>

        <button className='carousel-control-next' type='button' data-bs-target='#mycarousel' data-bs-slide='next'>
          <span className='carousel-control-next-icon'></span>
        </button>
      </div>

            </div>
    )
}

export default Carousel