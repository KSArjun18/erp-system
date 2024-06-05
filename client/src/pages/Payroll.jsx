import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { AccountCircle, CalendarToday, MonetizationOn, Receipt } from '@mui/icons-material';
// import { payrolls } from '../utils/APIRoutes'; // Comment out the actual API route

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        // Dummy data for testing
        const response = {
          data: {
            payrolls: [
              {
                _id: '1',
                userId: { name: 'John Doe' },
                month: 'January 2023',
                salary: '$4000',
                status: 'Paid',
              },
              {
                _id: '2',
                userId: { name: 'Jane Smith' },
                month: 'January 2023',
                salary: '$4500',
                status: 'Pending',
              },
              {
                _id: '3',
                userId: { name: 'Alice Johnson' },
                month: 'February 2023',
                salary: '$4200',
                status: 'Paid',
              },
            ],
          },
        };
        // const response = await axios.get(`${payrolls}`); // Comment out the actual API call
        setPayrollRecords(response.data.payrolls);
      } catch (error) {
        setError('Error fetching payroll records');
        console.error('Error fetching payroll records', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollRecords();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
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
    <div className="payroll">
      <TopBar onLogout={handleLogout} />
      <Typography variant="h3" gutterBottom>
        Payroll
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
                  <CalendarToday />
                </IconButton>
                Month
              </TableCell>
              <TableCell>
                <IconButton>
                  <MonetizationOn />
                </IconButton>
                Salary
              </TableCell>
              <TableCell>
                <IconButton>
                  <Receipt />
                </IconButton>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollRecords && payrollRecords.length > 0 ? (
              payrollRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.userId.name}</TableCell>
                  <TableCell>{record.month}</TableCell>
                  <TableCell>{record.salary}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Payroll;
