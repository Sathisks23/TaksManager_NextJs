
"use client"

import {useRouter} from "next/navigation"
import { useState } from "react"

export default function login(){

    const router = useRouter()
    const [inputs,setinputs]=useState({})
    const [message,setmessage]=useState('')

   function submithandler(e){
    e.preventDefault()
    fetch("http://localhost:3000/api/login",{
        method:"POST",
        body:JSON.stringify(inputs)
      }).then((res)=>res.json()).then((res)=>{  
        setmessage(res.message);
        console.log(res.message.search('logined'));
        
        setTimeout(  ()=>{ if(res.message.search('logined')!=-1){router.push('/taskmanager/adduser')} ; setmessage('');},3000)
      })
     
   }
    
   function inputhandler(e){
      setinputs((state)=>{return {...state,[e.target.name]:e.target.value}})
       
    }


    return(
        <div className="w-full h-screen flex items-center justify-center  text-black  ">
           
           <div className="p-5 text-center" >
                <form onSubmit={submithandler} method="POST" >
                 <div><h3 className="font-bold">Login to Continue</h3></div>

                   <div className="p-5" >  
                   <input onChange={inputhandler} className="border-2 rounded " required name="email" type='text'  placeholder="Email" />
                   </div>

                   <div className="p-5"> 
                   <input onChange={inputhandler} name="password" required className="border-2 rounded" type='text'  placeholder="password"/>
                   </div>

                   <input  className="text-bold border-2 rounded px-3 "  type="submit" value={"Login"} />
                </form>
                {message && <p>{message}</p> }
                </div>
        </div>
    )
}