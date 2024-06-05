import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { AccountCircle, DateRange, AccessTime, ExitToApp, EventAvailable, EventBusy, ReportProblem } from '@mui/icons-material';
import { attendance } from '../utils/APIRoutes';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        // const response = await axios.get(attendance, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   }
        // });

        // Dummy data for testing
        const response = {
          data: {
            attendanceRecords: [
              {
                _id: '1',
                userId: { name: 'John Doe' },
                date: '2023-06-01T00:00:00Z',
                logIn: '2023-06-01T09:00:00Z',
                logOut: '2023-06-01T17:00:00Z',
                leavesTaken: 2,
                leavesRemaining: 8,
                emergencyLeave: false,
              },
              {
                _id: '2',
                userId: { name: 'Jane Smith' },
                date: '2023-06-02T00:00:00Z',
                logIn: '2023-06-02T08:45:00Z',
                logOut: '2023-06-02T17:15:00Z',
                leavesTaken: 1,
                leavesRemaining: 9,
                emergencyLeave: true,
              }
            ]
          }
        };
                setAttendanceRecords(response.data.attendanceRecords || []);
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
        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="attendance">
      <TopBar onLogout={handleLogout} />
      <Typography variant="h3" gutterBottom>
        Attendance
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton>
                  <AccountCircle />
                </IconButton>
                Name
              </TableCell>
              <TableCell>
                <IconButton>
                  <DateRange />
                </IconButton>
                Date
              </TableCell>
              <TableCell>
                <IconButton>
                  <AccessTime />
                </IconButton>
                Log-In
              </TableCell>
              <TableCell>
                <IconButton>
                  <ExitToApp />
                </IconButton>
                Log-Out
              </TableCell>
              <TableCell>
                <IconButton>
                  <EventBusy />
                </IconButton>
                Leaves Taken
              </TableCell>
              <TableCell>
                <IconButton>
                  <EventAvailable />
                </IconButton>
                Leaves Remaining
              </TableCell>
              <TableCell>
                <IconButton>
                  <ReportProblem />
                </IconButton>
                Emergency Leave
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.userId?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.logIn ? new Date(record.logIn).toLocaleTimeString() : 'N/A'}</TableCell>
                  <TableCell>{record.logOut ? new Date(record.logOut).toLocaleTimeString() : 'N/A'}</TableCell>
                  <TableCell>{record.leavesTaken}</TableCell>
                  <TableCell>{record.leavesRemaining}</TableCell>
                  <TableCell>{record.emergencyLeave ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Attendance;
