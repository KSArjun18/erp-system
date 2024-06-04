import React, { useEffect, useState } from 'react';
import "../styles/admin_Dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner'; // Assuming you're using this loader
import TopBar from './TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBullhorn, faClock } from '@fortawesome/free-solid-svg-icons';
import "../styles/Topbar.css";

const Dashboard = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUsersPopup, setShowUsersPopup] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', role: '', email: '', password: '' });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
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

  const fetchUsers = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users", axiosConfig);
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.phone || !newEmployee.role || !newEmployee.email || !newEmployee.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/add_employee", newEmployee, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("Employee added successfully");
      setShowPopup(false);
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditUserChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/update_employee/${editUser._id}`, editUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("User updated successfully");
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/delete_employee/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(value)));
  };

  useEffect(() => {
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    } else {
      fetchData();
      fetchUsers();
    }
  }, [token]);
  
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
    toast.info("Logged out successfully");
  };

  return (
    <div className='dashboard-main'>
      <TopBar onLogout={handleLogout} />
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div>
          <button className="view-users-button" onClick={() => setShowUsersPopup(true)}>View Employee</button>
          <button className="add-employee-button" onClick={() => setShowPopup(true)}>Add New Employee</button>
        </div>
      </div>
      <p>Hi {data.msg}</p>

      {loading ? (
        <div className="loading-spinner">
          <RotatingLines width="100" strokeColor="#007bff" />
        </div>
      ) : (
        <>
          <div className="dashboard-content">
            <div className="employee-count-card">
              <FontAwesomeIcon icon={faUsers} size="2x" />
              <div className="count">{users.length}</div>
              <div className="label">Employees</div>
            </div>
            
            <div className="summary-cards">
              <div className="summary-card">
                <FontAwesomeIcon icon={faUser} size="2x" />
                <div className="summary-content">
                  <div className="summary-title">Active Users</div>
                  <div className="summary-value">5</div>
                </div>
              </div>
              <div className="summary-card">
                <FontAwesomeIcon icon={faBullhorn} size="2x" />
                <div className="summary-content">
                  <div className="summary-title"> News</div>
                  <div className="summary-value">5</div>
                </div>
              </div>
              <div className="summary-card">
                <FontAwesomeIcon icon={faClock} size="2x" />
                <div className="summary-content">
                  <div className="summary-title">Task</div>
                  <div className="summary-value">8</div>
                </div>
              </div>
            </div>

            <div className="announcements">
              <h2>Latest Announcements</h2>
              <ul>
                <li>New HR policies updated for 2024.</li>
                <li>Annual team-building event scheduled for July.</li>
                <li>New project kick-off meeting on Monday.</li>
              </ul>
            </div>

            <div className="recent-activities">
              <h2>Recent Activities</h2>
              <ul>
                <li>John Doe updated the project status.</li>
                <li>Jane Smith uploaded a new document.</li>
                <li>Team meeting conducted on the new marketing strategy.</li>
              </ul>
            </div>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2>Add New Employee</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={newEmployee.phone}
                  onChange={handleInputChange}
                />
                <select name="role" value={newEmployee.role} onChange={handleInputChange}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                  <option value="accounts">Accounts</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newEmployee.password}
                  onChange={handleInputChange}
                />
                <button onClick={handleAddEmployee}>Add Employee</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </div>
          )}

          {showUsersPopup && (
            <div className="full-page-popup">
              <div className="popup-content">
                <div className="popup-header">
                  <h2>All Employees</h2>
                  <span 
                    className="close-icon" 
                    onClick={() => setShowUsersPopup(false)}
                  >
                    &times;
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ width: '20%', marginRight: '80%' }}
                />
                <table>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {editUser?._id === user._id ? (
                            <input
                              type="text"
                              value={editUser.name}
                              onChange={(e) =>
                                setEditUser({ ...editUser, name: e.target.value })
                              }
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                        <td>
                          {editUser?._id === user._id ? (
                            <input
                              type="text"
                              value={editUser.email}
                              onChange={(e) =>
                                setEditUser({ ...editUser, email: e.target.value })
                              }
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td>
                          {editUser?._id === user._id ? (
                            <input
                              type="text"
                              value={editUser.phone}
                              onChange={(e) =>
                                setEditUser({ ...editUser, phone: e.target.value })
                              }
                            />
                          ) : (
                            user.phone
                          )}
                        </td>
                        <td>
                          {editUser?._id === user._id ? (
                            <select
                              value={editUser.role}
                              onChange={(e) =>
                                setEditUser({ ...editUser, role: e.target.value })
                              }
                            >
                              <option value="admin">Admin</option>
                              <option value="hr">HR</option>
                              <option value="accounts">Accounts</option>
                              <option value="manager">Manager</option>
                              <option value="employee">Employee</option>
                            </select>
                          ) : (
                            user.role
                          )}
                        </td>
                        <td>
                          {editUser?._id === user._id ? (
                            <>
                              <button onClick={() => handleUpdateUser(editUser)}>Save</button>
                              <button onClick={() => setEditUser(null)}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setEditUser(user)}>Edit</button>
                              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
