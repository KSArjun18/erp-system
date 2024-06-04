import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCalendarCheck, FaUserClock } from 'react-icons/fa';
// import TopBar from './TopBar';
import "../styles/EmployeeDashboard.module.css";

const EmployeeDashboard = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [employee, setEmployee] = useState(null);
  const [timesheets, setTimesheets] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({});

  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('/api/v1/employee/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch employee data');
      }
      
    };
    
    const fetchData = async () => {
      await Promise.all([fetchEmployeeData(), fetchTimesheets(), fetchAttendanceRecords()]);
      setLoading(false);
      let axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
        
      };
  
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/v1/admin_dashboard", axiosConfig);
        setData({ msg: response.data.msg });
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get('/api/v1/timesheet', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTimesheets(response.data.timesheetRecords || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch timesheets');
      }
    };

    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('/api/v1/attendance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAttendanceRecords(response.data.attendanceRecords || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch attendance records');
      }
    };
    
    // const fetchData = async () => {
    //   await Promise.all([fetchEmployeeData(), fetchTimesheets(), fetchAttendanceRecords()]);
    //   setLoading(false);
    // };

    fetchData();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login');
  //   toast.info('Logged out successfully');
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="employee-dashboard">
      {/* <TopBar onLogout={handleLogout} /> */}
      <h2> {data.msg}!</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaCalendarCheck className="dashboard-icon" />
          <h3>Attendance</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No attendance records available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="dashboard-card">
          <FaUserClock className="dashboard-icon" />
          <h3>Timesheet</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.length > 0 ? (
                timesheets.map((record) => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.hoursWorked}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No timesheet records available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Link to="/logout" className="logout-button">Logout</Link>
    </div>
  );
};

export default EmployeeDashboard;
