"use client"

import { useEffect, useState } from "react";


export default function homepage(){
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks,setTasks]= useState([])
  const [id,setId]=useState('')
  const [status,setStatus]=useState('pending')
  const [message,setMessage]=useState('')
  
  useEffect(()=>{
    const fetchData = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/updatetask');
        const data = await res.json();
       

        if (data && data.updates) {
          setTasks(data.updates); 
        }}
        fetchData()
  },[])

    const closeModal = () => setIsModalOpen(false);
    const openModal = () =>{ 
      console.log('id',id,'stauts',status);
      
               setIsModalOpen(true)
               const fetchData = async () => {
               const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/updatetask',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({'id':id,'status':status}),
              });
               const data = await res.json();
               console.log('djg',data);
               setMessage(data.message)
               if(data.updates){setTasks(data.updates)}
               }
               setTimeout(() => {
                   closeModal()
               }, 1000);
               fetchData()
    };

   
     const statusChange =(e,id)=>{
             setId(id)
             setStatus(event.target.value)
        
     }
return(
    
    <>
     <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg mt-5">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 border-b">User Name</th>
            <th className="py-3 px-6 border-b">Task</th>
            <th className="py-3 px-6 border-b">Description</th>
            <th className="py-3 px-6 border-b">Status</th>
            <th className="py-3 px-6 border-b">Edit Status</th>
          </tr>
        </thead>
        <tbody>
            {tasks.map((task)=>(
                <tr key={task._id} className="hover:bg-gray-50 transition duration-200">
            <td className="py-4 px-6 border-b">{task.username}</td>
            <td className="py-4 px-6 border-b">{task.task}</td>
            <td className="py-4 px-6 border-b">{task.description}</td>
            <td className="py-4 px-6 border-b text-yellow-600 font-semibold">
              {task.status }
            </td>
            <td>
                
                <select name="status" onChange={(e)=>statusChange(e,task._id)} className="p-2 rounded ">
                    <option>pending</option>
                    <option>in-progress</option>
                    <option>completed</option>
                </select>
                <button onClick={openModal} className="bg-blue-400 rounded ml-2 text-white p-2">Update</button>
            </td>
       
          </tr>
            ))}
        </tbody>
      </table>

      {
    isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
         <div className="bg-zinc-50 rounded  w-80  text-center" >
         <h1 className=" text-green-600 p-3  text-xl">{message}</h1>
         </div>
        </div>
    )
}

      

      



    </>
)
}