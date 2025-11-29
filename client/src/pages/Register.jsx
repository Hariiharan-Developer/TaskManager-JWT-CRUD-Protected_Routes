import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "../schema/schemaValidation";
import "./Register.css";
import {Link} from 'react-router-dom'
import { FaPaperPlane } from "react-icons/fa";
import api  from "../API/api";
import{toast} from'react-toastify'
import { useNavigate } from "react-router-dom";

//onsubmit :


const Register = () => {


    const onSubmit =async(value,action)=>{
    try{
        const res= await api.post('/user/register',value)
        localStorage.setItem('token',res.data.token)
        toast.success('User Registered Successfully. Please LogIn',{
            position:'top-center',
            autoClose:3000,
            style:{
                backgroundColor:'black',
                color:'white'
            }
        })
        action.resetForm()
        navigate('/')
    }catch(error){
        console.log(error.response?.data?.message)
        toast.error( error.response?.data?.message ||'Something Went Wrong',{
            position:'top-center',
            autoClose:3000,
            style:{
                backgroundColor:'black',
                color:'white'
            }
        })
    }
}
    
  const navigate = useNavigate()
  const { errors, handleBlur, handleSubmit, handleChange, values, touched ,isSubmitting} =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        age: "",
        phone: "",
        password: "",
        role: "",
      },
      validationSchema: registerSchema,
      onSubmit
    });

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow p-4" style={{ width: "450px", borderRadius: "12px" }}>
        <h2 className="text-center mb-1 fw-bold">User Registration</h2>
        <p className="text-center text-muted">Create your account to continue</p>

        <form onSubmit={handleSubmit} className="mt-3">

          {/* Name */}
          <div className="mb-1">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              className={`form-control ${errors.name && touched.name ? "is-invalid" : ""}`}
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
            />
            {errors.name && touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-1">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="example@gmail.com"
            />
            {errors.email && touched.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Age */}
          <div className="mb-1">
            <label htmlFor="age" className="form-label fw-semibold">Age</label>
            <input
              className={`form-control ${errors.age && touched.age ? "is-invalid" : ""}`}
              type="number"
              id="age"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter age"
            />
            {errors.age && touched.age && (
              <div className="invalid-feedback">{errors.age}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-1">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="•••••••"
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/*Phone */}
          <div className="mb-1">
            <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
            <input
              className={`form-control ${errors.phone && touched.phone ? "is-invalid" : ""}`}
              type="tel"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Mobile number"
            />
            {errors.password && touched.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role" className="form-label fw-semibold">Role</label>
            <select
              className={`form-select ${errors.role && touched.role ? "is-invalid" : ""}`}
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" disabled>Select one</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && touched.role && (
              <div className="invalid-feedback">{errors.role}</div>
            )}
          </div>
          <button type="submit" className="btn btn-dark w-100 fw-bold py-2">
            {isSubmitting ? (<><FaPaperPlane/><span className="mx-2">Submiting...</span></>): (<><span>Register</span></>)}
            
          </button>
          <p className="text-center mt-2">Already have an Account please login <span ><Link style={{textDecoration:'none'}} to='/login'>Login</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
