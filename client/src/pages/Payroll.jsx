import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Modal from 'react-modal';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Button } from '@mui/material';
import { AccountCircle, CalendarToday, MonetizationOn, Receipt, Close } from '@mui/icons-material';
// import { payrolls } from '../utils/APIRoutes'; // Comment out the actual API route
import "../styles/Payroll.css"
Modal.setAppElement('#root'); // To avoid screen readers issues

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
                userId: { name: 'Sasikala', employeeId: 'EMP001', department: 'HR' },
                month: 'January 2023',
                payPeriod: '01/01/2023 - 31/01/2023',
                payDate: '31/01/2023',
                basicSalary: 7000,
                houseRentAllowance: 3000,
                providentFund: 500,
                esi: 200,
                grossEarnings: 10000,
                totalDeductions: 700,
                netPay: 9300,
                paidDays: 31,
                lopDays: 0,
                status: 'Paid',
              },
              {
                _id: '2',
                userId: { name: 'Elakiya', employeeId: 'EMP002', department: 'Accounts' },
                month: 'January 2023',
                payPeriod: '01/01/2023 - 31/01/2023',
                payDate: '31/01/2023',
                basicSalary: 7500,
                houseRentAllowance: 3500,
                providentFund: 550,
                esi: 250,
                grossEarnings: 11000,
                totalDeductions: 800,
                netPay: 10200,
                paidDays: 31,
                lopDays: 0,
                status: 'Pending',
              },
              {
                _id: '3',
                userId: { name: 'Perm Kumar', employeeId: 'EMP003', department: 'HR' },
                month: 'February 2023',
                payPeriod: '01/02/2023 - 28/02/2023',
                payDate: '28/02/2023',
                basicSalary: 7200,
                houseRentAllowance: 2800,
                providentFund: 520,
                esi: 220,
                grossEarnings: 10000,
                totalDeductions: 740,
                netPay: 9260,
                paidDays: 31,
                lopDays: 0,
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

  const generatePayslip = (record) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Payslip', 105, 15, null, null, 'center');

    doc.setFontSize(12);
    doc.text('Company: JWT Solutions', 14, 22);
    doc.text(`Employee Name: ${record.userId.name}`, 14, 30);
    doc.text(`Employee ID: ${record.userId.employeeId}`, 14, 37);
    doc.text(`Department: ${record.userId.department}`, 14, 44);
    doc.text(`Pay Period: ${record.payPeriod}`, 14, 51);
    doc.text(`Pay Date: ${record.payDate}`, 14, 58);

    const earnings = [
      ['Basic Salary', record.basicSalary],
      ['House Rent Allowance', record.houseRentAllowance],
      ['Gross Earnings', record.grossEarnings],
    ];

    const deductions = [
      ['Provident Fund', record.providentFund],
      ['ESI', record.esi],
      ['Total Deductions', record.totalDeductions],
    ];

    const summary = [
      ['Total Net Payable', record.netPay],
      ['Paid Days', record.paidDays],
      ['LOP Days', record.lopDays],
    ];

    doc.autoTable({
      head: [['EARNINGS', 'AMOUNT']],
      body: earnings,
      startY: 65,
    });

    doc.autoTable({
      head: [['DEDUCTIONS', 'AMOUNT']],
      body: deductions,
      startY: doc.autoTable.previous.finalY + 10,
    });

    doc.autoTable({
      body: summary,
      startY: doc.autoTable.previous.finalY + 10,
    });

    return doc;
  };

  const openPreviewModal = (record) => {
    setSelectedRecord(record);
    setModalIsOpen(true);
  };

  const closePreviewModal = () => {
    setModalIsOpen(false);
    setSelectedRecord(null);
  };

  const downloadPayslip = () => {
    if (selectedRecord) {
      const doc = generatePayslip(selectedRecord);
      doc.save(`payslip_${selectedRecord.userId.name}_${selectedRecord.month}.pdf`);
    }
    closePreviewModal();
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollRecords && payrollRecords.length > 0 ? (
              payrollRecords.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.userId.name}</TableCell>
                  <TableCell>{record.month}</TableCell>
                  <TableCell>{record.netPay}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => openPreviewModal(record)}>
                      Preview Pay Slip
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalIsOpen} onRequestClose={closePreviewModal} contentLabel="Payslip Preview" className="modal-content">
        <div className="modal-header">
          <Typography variant="h5">Payslip Preview</Typography>
          <IconButton onClick={closePreviewModal}>
            <Close />
          </IconButton>
        </div>
        <div className="modal-body" id="payslip-preview">
          {selectedRecord && (
            <iframe
              src={generatePayslip(selectedRecord).output('datauristring')}
              width="100%"
              height="100%"
              title="Payslip Preview"
            />
          )}
        </div>

        <div className="modal-footer">
          <Button variant="contained" color="primary" onClick={downloadPayslip}>
            Download Pay Slip
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Payroll;
