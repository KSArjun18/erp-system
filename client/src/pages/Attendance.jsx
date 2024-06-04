import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/api/v1/attendance', {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // setAttendanceRecords(response.data.attendanceRecords);
        
        // Dummy data for testing
        const response = {
          data: {
            attendanceRecords: [
              {
                _id: '1',
                userId: { name: 'John Doe' },
                date: '2023-06-01T00:00:00Z',
                checkIn: '2023-06-01T09:00:00Z',
                checkOut: '2023-06-01T17:00:00Z',
                leavesTaken: 2,
                leavesRemaining: 8,
                emergencyLeave: false,
              },
              {
                _id: '2',
                userId: { name: 'Jane Smith' },
                date: '2023-06-02T00:00:00Z',
                checkIn: '2023-06-02T08:45:00Z',
                checkOut: '2023-06-02T17:15:00Z',
                leavesTaken: 1,
                leavesRemaining: 9,
                emergencyLeave: true,
              }
            ]
          }
        };
        setAttendanceRecords(response.data.attendanceRecords);
        console.log(response, "data");
      } catch (error) {
        setError('Error fetching attendance records');
        console.error('Error fetching attendance records', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast.info('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="loading"
        />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="attendance">
      <TopBar onLogout={handleLogout} />
      <h3>Attendance</h3>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Leaves Taken</th>
            <th>Leaves Remaining</th>
            <th>Emergency Leave</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords && attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.userId.name}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'N/A'}</td>
                <td>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'N/A'}</td>
                <td>{record.leavesTaken}</td>
                <td>{record.leavesRemaining}</td>
                <td>{record.emergencyLeave ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
