import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrollRecords = async () => {
      try {
        const response = await axios.get('/api/v1/payrolls');
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
    localStorage.removeItem("auth");
    navigate("/login");
    toast.info("Logged out successfully");
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
    <div className="payroll">
      <TopBar onLogout={handleLogout} />
      <h3>Payroll</h3>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Month</th>
            <th>Salary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payrollRecords && payrollRecords.length > 0 ? (
            payrollRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.userId.name}</td>
                <td>{record.month}</td>
                <td>{record.salary}</td>
                <td>{record.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Payroll;
