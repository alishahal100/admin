import React from 'react'
import Navbar from './TurfComponents/Navbar'
import {jwtDecode} from 'jwt-decode'
const SellerDashboard = () => {

  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;

  console.log("token : ",role);

  if (role === 'seller') {
    return (
      <div>
        <Navbar/>
      </div>
    )
    
  } else {
    return(
      <div className=' text-center '>
        <h1>403 : Not Authorized</h1>
      </div>
    )
  }
  
  
}

export default SellerDashboard
