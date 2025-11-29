import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
const Navbar =()=>{
  const navigate =useNavigate()
  const handlelogout =()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('loged out successfully',{
      position:'top-center',
      autoClose:3000,
      style:{
        backgroundColor:'black',
        color:'white'
      }
    })
    navigate('/login')
  }
    return(
        <div>
            <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">TaskManager + jwt</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Taskmanager +jwt</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
           <button className='btn btn-warning' onClick={handlelogout}>Log out</button>
          </li>
          </ul> 
      </div>
    </div>
  </div>
</nav>

            </div>
    )
}

export default Navbar