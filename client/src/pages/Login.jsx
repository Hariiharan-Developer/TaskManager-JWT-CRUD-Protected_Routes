import React from "react";
import { useFormik } from "formik";
import { loginSchema, registerSchema } from "../schema/schemaValidation";
import "./Register.css";
import{FaPaperPlane}from'react-icons/fa'
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../API/api";
const Login = () => {
    const navigate =useNavigate()
    const onSubmit =async(value,action)=>{
        try{
            const res = await api.post('/user/login',value)
            localStorage.setItem('token',res.data.token)
            toast.success('Loged-in Successfully',{
                position:'top-center',
                autoClose:300,
                style:{
                    backgroundColor:'black',
                    color:'white'
                }
            })
            navigate('/')
            action.resetForm()
        }catch(error){
            console.log(error.response?.data?.message)
            toast.error( error.response?.data?.message||'Something went wrong',{
                position:'top-center',
                autoClose:300,
                style:{
                    backgroundColor:'black',
                    color:'white'
                }
            })
        }
    }
  const { errors, handleBlur, handleSubmit, handleChange, values, touched ,isSubmitting} =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit
    });

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 p-4">
      <div className="card shadow p-4" style={{ width: "450px", borderRadius: "12px" }}>
        <h2 className="text-center mb-3 fw-bold">Login</h2>
        <p className="text-center text-muted">Login your account to continue</p>

        <form onSubmit={handleSubmit} className="mt-3">

          
          {/* Email */}
          <div className="mb-3">
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

         

          {/* Password */}
          <div className="mb-3">
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

           <button type="submit" className="btn btn-dark w-100 fw-bold py-2">
                      {isSubmitting ? (<><FaPaperPlane/><span className="mx-2">Submiting...</span></>): (<><span>Login</span></>)}
                      
                    </button>
          <p className='text-center mt-2'>Dont have an Account please register first !<br/>
           <span>Click here <Link style={{textDecoration:'none'}} to='/register'>Register</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
