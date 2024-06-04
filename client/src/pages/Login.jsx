import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import { jwtDecode } from "jwt-decode";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();



  const handleLoginSubmit = async (e) => {
    let token = localStorage.getItem("token");
    let decoded;
    if (token) {
      decoded = jwtDecode(token);
    }
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          formData
        );
        
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        if (response && response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          if (decoded.role === "admin") {
            navigate("/admin_dashboard");
          } else {
            if (decoded.role == "hr") {
              navigate("/Hr_dashboard");
            } else if (decoded.role == "accounts") {
              navigate("/Accounts_dashboard");
            } else if (decoded.role == "manager") {
              navigate("/Manager_dashboard");
            } else if (decoded.role == "employee") {
              navigate("/Employee_dashboard");
            }
          }
        } 
        toast.success("Login successfull");
        // navigate("/admin_dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };
  useEffect(() => {
    if(token !== "") {
      const userRole = JSON.parse(localStorage.getItem("role")); // Assuming userRole is stored in localStorage
      if (userRole) {
        toast.success("You already logged in");
        if (userRole === "admin") navigate("/admin_dashboard");
        if (userRole === "hr") navigate("/hr_dashboard");
        if (userRole === "manager") navigate("/manager_dashboard");
        if (userRole === "accounts") navigate("/accounts_dashboard");
        if (userRole === "employee") navigate("/employee_dashboard");
      }
    }
  }, []);
  

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Animated Image" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
               
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
               
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
