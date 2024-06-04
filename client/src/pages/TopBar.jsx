// TopBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaClock, FaCalendarCheck, FaMoneyBillWave, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <div className="top-bar">
      <button className="back-button" onClick={goBack}>
        <FaAngleLeft />
        <span>Back</span>
      </button>
      <div className="top-bar-section">
        <Link to="/timesheet">
          <FaClock className="icon" />
          TimeSheet
        </Link>
      </div>
      <div className="top-bar-section">
        <Link to="/attendance">
          <FaCalendarCheck className="icon" />
          Attendance
        </Link>
      </div>
      <div className="top-bar-section">
        <Link to="/payroll_management">
          <FaMoneyBillWave className="icon" />
          Payroll Management
        </Link>
      </div>
      <div className="top-bar-section">
        <button onClick={onLogout}>
          <FaSignOutAlt className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
