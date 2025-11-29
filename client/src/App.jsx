import React from 'react'
import Navbar from './component/Navbar'
import Dashboard from './pages/Dashboard'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ModelProvider } from './context/ModelContext'
import CreateTask from './pages/CreateTask'
import MyCreation from './pages/MyCreation'
import { Protect } from './Protect/Protect'


const App = () => {
  return (
    <div>
      <ModelProvider>
      <ToastContainer/>
      <Navbar/>
      <CreateTask/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        
        <Route path='/mycreation' element={
          <Protect>
          <MyCreation/>
          </Protect>
          }/>
        <Route path='/' element={
          <Protect>
          <Dashboard/>
          </Protect>
          }/>
        
      </Routes>
      </ModelProvider>
    </div>
  )
}

export default App
