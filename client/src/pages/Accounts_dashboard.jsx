import React from 'react'
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Accounts_dashboard = () => {
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

export default Accounts_dashboard