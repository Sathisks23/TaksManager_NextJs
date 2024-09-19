"use client"
import { useEffect, useState } from "react"





export default function AddTask() {
  const [inputs, setInputs] = useState({ status: "pending" });
  const [message, setMessage] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classClr,setclr]=useState()

  const handleInputs = (e) => {
    setInputs((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  
  const submitHandler = (e) => {
    e.preventDefault();
   
    
    fetch("http://localhost:3000/api/admintaskpage",{
      method:"POST",
      body:JSON.stringify(inputs)
    }).then((res)=>res.json()).then((res)=>{  
      setMessage(res.message);
      setTasks(res.totlalTask)
      console.log("Postmethod",res.tasks);
      setTimeout(  ()=>{  ;setMessage('');setIsModalOpen(false);;},3000)
    })
    
  };

 
  useEffect( () => {
    const fetchData = async () => {
     
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/adminpage');
        const data = await res.json();
        console.log('API Data:', data);  
        if (data && data.tasks) {
          setTasks(data.tasks); 
          setUsernames(data.users)
          
        }
     
    };

    fetchData();

  }, []);
 
 

  




  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
     
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg w-1/2">
            <button
              onClick={closeModal}
              className="text-gray-500 float-right text-lg font-bold"
            >
              &times;
            </button>

            <form onSubmit={submitHandler} className="text-center p-3">
              <h3 className="font-bold my-10">Add Tasks</h3>

              <div className="mb-5 rounded">
                <select
                  name="username"
                  onChange={handleInputs}
                  className="w-full border p-2 rounded"
                >
                  <option>Select User</option>
                  {usernames.map((user) => {
                   
                      return (
                        <option key={user._id} value={user.username}>
                          {user.username}
                        </option>
                      );
               
                  })}
                </select>
              </div>

              <div className="mb-5">
                <input
                  className="border-2 w-full p-2 rounded"
                  name="task"
                  placeholder="Task Title"
                  onChange={handleInputs}
                  type="text"
                />
              </div>

              <div className="w-full mb-5">
                <textarea
                  className="border-2 w-full p-2 rounded"
                  name="description"
                  onChange={handleInputs}
                  placeholder="Task Description"
                ></textarea>
              </div>

              <div className="w-full mb-5">
                <select
                  name="status"
                  onChange={handleInputs}
                  className="rounded w-full border p-2"
                >
                  <option>pending</option>
                  <option>in-progress</option>
                  <option>completed</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>

              
              {message && (
                <div className="mt-4 text-green-600 font-semibold">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    
    
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg mt-5">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
            <th className="py-3 px-6 border-b">User Name</th>
            <th className="py-3 px-6 border-b">Task</th>
            <th className="py-3 px-6 border-b">Description</th>
            <th className="py-3 px-6 border-b">Status</th>
         
          </tr>
        </thead>
        <tbody>
         
          {tasks.map((task) => (
        <tr key={task.id} className="hover:bg-gray-50 transition duration-200">

          <td className="py-4 px-6 border-b">{task.username}</td>
          <td className="py-4 px-6 border-b">{task.task}</td>
          <td className="py-4 px-6 border-b">{task.description}</td>
            {task.status=="pending"? 
            <td className="py-4 px-6 border-b text-orange-600 font-semibold" >
            {task.status}
           </td>:task.status=="in-progress"?<td className="py-4 px-6 border-b text-yellow-600 font-semibold" >
            {task.status}
           </td>:
           <td className="py-4 px-6 border-b text-green-700 font-semibold" >
            {task.status}
           </td>
            }
          
        </tr>
))}

        </tbody>
      </table>
    </>
  );
}
