"use client"
import { useEffect } from "react"

// export default function admin(){
 
//     useEffect(()=>{
//        fetch( process.env.NEXT_PUBLIC_API_URL+'/api/adminpage').then((res)=>res.json().then((res)=>{
//         // console.log(res);
        
//        }))
//     },[])

//     return(
//         <div className=" flex gap-1 justify-around ">
//             <div className="w-1/2 0" >
//             <div className="container text-center bg-slate-100" > <h4>Tasks Details</h4> 
//             <table  className="table-auto  w-full">
//                 <thead>
//                    <tr>
//                     <th>User Name</th>
//                     <th>Task</th>
//                     <th>description</th>
//                     <th> status</th>
//                    </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>ram</td>
//                         <td>Make ui</td>
//                         <td>full fedged app for shoping</td>
//                         <td>pending</td>
//                         <td><button className="button" >Edit</button> <button className="button">Delete</button></td>
//                     </tr>
//                 </tbody>
//             </table>
//             </div>
            

//             </div> 
//             <div className=" w-1/2" >
//             <div className="container text-center" > <h4>User Details</h4> 
//             <table className="table-auto  w-full">
//                 <thead>
//                     <tr>
//                         <th>User Name</th>
//                         <th>Email</th>
//                         <th>password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>ram</td>
//                         <td>ram@gmail.com</td>
//                         <td>ram@123</td>
//                     </tr>
//                 </tbody>
//                </table>
//             </div>

               
//             </div>
//         </div>
//     )

// }

export default function admin(){
    return(
        <div><h1>Admin</h1></div>
    )
}