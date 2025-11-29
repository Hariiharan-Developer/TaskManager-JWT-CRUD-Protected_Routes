import { createContext, useState } from "react";
import api from "../API/api";

export const ModelContext = createContext()

export const ModelProvider = ({children}) => {
    const [show,setShow] =useState(false)
    const handleClose = ()=>setShow(false)
      const [task, setTask] = useState([])
        const [loading, setLoading] = useState(true)
            const [name,setName] = useState('')
        

            // get task :
      const getTask = async () => {
          try {
            const res = await api.get('/task')
            setTask(res.data.message)
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
      
            //get User :
            const getUserDetail =async()=>{
                try{
                    const res = await api.get('/user/getUser')
                    setName(res.data.data.name)
                }catch(error){
                    console.log(error.response?.data?.message)
                    console.log(error)
                }
            }

         
      
    

  return (
            <ModelContext.Provider value={{show,setShow,handleClose,task, setTask,getTask,loading,setLoading,name,setName,getUserDetail}}>
                {children}
            </ModelContext.Provider>
        )  
}

