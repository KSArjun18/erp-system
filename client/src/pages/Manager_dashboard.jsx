import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopBar from './TopBar';
const Manager_dashboard = () => {
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

export default Manager_dashboard