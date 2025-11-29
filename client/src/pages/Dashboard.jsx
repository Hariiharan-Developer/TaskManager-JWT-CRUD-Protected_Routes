import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import Carousel from './Carousel'
import { useState } from 'react'
import api from '../API/api'
import { ModelContext } from '../context/ModelContext'
import {Link} from 'react-router-dom'
import MyCreation from './MyCreation'

const Dashboard = () => {

    const [active,setActive] =useState(2)
    const {show,setShow,name,setName,getUserDetail}=useContext(ModelContext)

    useEffect(()=>{
        getUserDetail()
    },[])

    const handleClose =()=>setShow(false)
  return (
    <div className='container mt-5 pt-5'>

      {/* Greetings */}
      <div className='mt-4'>
        <h1 className='fw-bold'>Hello {name ? <span className='fw-bold 'style={{color:'orange'}}>{name}</span> :'User'} welcome back !</h1>
        <p>Have a nice day </p>
      </div>

      {/* Navigation buttons */}
      <div className='d-flex justify-content-center my-3'>
        <button onClick={()=>{setShow(true);setActive(1)}} className={`btn btn-sm  mx-2 ${active ===1 ? 'MyBtn' :''}`}>My Creation</button>
        <button onClick={()=>setActive(2)} className={`btn btn-sm mx-2 ${active ===2 ? 'MyBtn' :''}`}>In-Proggress</button>
        <button onClick={()=>setActive(3)} className={`btn btn-sm mx-2 ${active ===3 ? 'MyBtn' :''}`}>Completed</button>
      </div>

      <Carousel/>
      <MyCreation/>



    </div>
  )
}

export default Dashboard
