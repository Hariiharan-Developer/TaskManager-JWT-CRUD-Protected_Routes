import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ModelContext } from "../context/ModelContext";
import {toast} from 'react-toastify'
import { api } from "../API/api";
const CreateTask =()=>{
  const {show,setShow,handleClose,getTask,setTask} = useContext(ModelContext)
  const [post,setPost] = useState({
    task:'',
    detail:''
  })
  const {task,detail} = post

  const onchange =(e)=>{
    setPost({...post,[e.target.name]:e.target.value})
    

  }
  const submitForm =async (e)=>{
    e.preventDefault()
    try{
        const res = await api.post('/task',post)
        toast.success(res.data.message,{
          position:'top-center',
          autoClose:3000,
          style:{
            backgroundColor:'black',
            color:'white'
          }
        })
        getTask()
        setPost({
          task:'',
          detail:''
        })

    }catch(error){
      toast.error(error.response?.data?.message || 'Something went wrong',{
          position:'top-center',
          autoClose:3000,
          style:{
            backgroundColor:'black',
            color:'white'
          }
        })
      console.log(error.response?.data?.message)
      console.log(error)
    }

  }



    return(
        <div>
            
    {/*Modal */}     


    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      backdrop="static"
      className="custom-modal"
    >
      {/* HEADER */}
      <Modal.Header closeButton className="bg-dark text-white border-0 py-3">
        <Modal.Title className="fw-bold">Create New Task</Modal.Title>
      </Modal.Header>

      {/* BODY */}
      <Modal.Body className="px-4 py-4">

        <Form onSubmit={submitForm}>
          {/* Task Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Task Name</Form.Label>
            <Form.Control 
              name="task"
              type="text" 
              placeholder="Enter your task..." 
              className="shadow-sm"
              value={task}
              onChange={onchange}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control 
              as="textarea"
              name="detail"
              rows={3}
              placeholder="Write a short description..."
              className="shadow-sm"
              value={detail}
              onChange={onchange}
            />
          </Form.Group>

         
      <Modal.Footer className="border-0 px-4 pb-4">
        <Button 
          variant="secondary"
          className="px-4"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button 
          variant="dark" 
          className="px-4 shadow-sm fw-bold"
          type="submit"
>
          Create Task
        </Button>
      </Modal.Footer>
        </Form>

      </Modal.Body>

      {/* FOOTER */}

    </Modal>
            </div>
    )
}

export default CreateTask