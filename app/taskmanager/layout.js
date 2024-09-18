'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function dashboardLayout({children}){
    const route= useRouter()
    const [isadmin,setadmin]=useState(false)
    const [url, setUrl] = useState(null);
    
    useEffect(()=>{
        setUrl(location.pathname)
           fetch(process.env.NEXT_PUBLIC_API_URL+'/api/dashboard').then((res)=>res.json()).then((res)=>{  
           
           
            if(res.message=='admin'){setadmin(true);route.push('/taskmanager/adduser')}
            else if(!res.message=='empty'){route.push('/login')}
            else{route.push('/taskmanager/homepage')}
           })
    },[])

    

    function navadmin(){ route.push('/admin')}
    function navhome(){ route.push('/taskmanager/homepage')}
    function navadduser(){ route.push('/taskmanager/adduser')}
    function navaddtask(){ route.push('/taskmanager/addtask')}
    function logout(){
        fetch(process.env.NEXT_PUBLIC_API_URL+'/api/logout').then(res=>res)
        route.push('/login')
    }


    return(
        <>
       
         
            {isadmin==true ? <>

                <div className="flex p-5 bg-slate-800 text-white justify-around ">
                <div> <button onClick={navadmin} >Admin</button> </div>
                <div>
            <button className="mx-6 " onClick={navadduser}>User List</button> 
            <button onClick={navaddtask} className="mx-6">Tasks</button> </div> 
            <button onClick={logout}>logout</button>
             </div>

                 

            </> : 

             <div className="flex p-5 bg-slate-800 text-white justify-around ">
                 <button onClick={navhome} >Task Manager</button>   
                 <button onClick={logout}>logout</button>
             </div>
         }
        {children}
        </>
    )
}