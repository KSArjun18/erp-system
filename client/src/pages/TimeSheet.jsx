import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopBar from './TopBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/TimeSheet.css'; // Add your custom styles here

const TimeSheet = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeSheets = async () => {
      try {
        const response = await axios.get('/api/v1/time_sheets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTimeSheets(response.data.timeSheets);
      } catch (error) {
        setError('Error fetching time sheets');
        console.error('Error fetching time sheets', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSheets();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    toast.info("Logged out successfully");
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && timeSheets && timeSheets.length > 0) {
      const daySheets = timeSheets.filter(
        (sheet) => new Date(sheet.date).toDateString() === date.toDateString()
      );

      if (daySheets.length > 0) {
        return daySheets.map((sheet) => (
          <div key={sheet._id} className="time-sheet-entry">
            <p>{sheet.userId.name}</p>
            <p>{sheet.userId.role}</p>
            <p>{sheet.hoursWorked} hrs</p>
          </div>
        ));
      }
    }
    return null;
  };

  return (
    <div className="time-sheet">
      <TopBar onLogout={handleLogout} />
      <div className="time-sheet-header">
        <h3>Time Sheet</h3>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="time-sheet-calendar">
          <Calendar
            tileContent={tileContent}
          />
        </div>
      )}
    </div>
  );
};

export default TimeSheet;
