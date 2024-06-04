import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';


const Hr_dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    toast.info("Logged out successfully");
  };
  return (
    <div>
     <TopBar onLogout={handleLogout} />
   
    </div>
  )
}

export default Hr_dashboard