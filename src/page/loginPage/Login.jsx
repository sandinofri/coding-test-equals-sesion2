import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo technopartner.png";
import "../loginPage/login.css";

const Login = () => {
  const [username, setUsername] = useState("support@technopartner.id");
  const [password, setPassword] = useState("1234567");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const apiUrl = "https://soal.staging.id/oauth/token";

    // Membuat objek data yang akan dikirimkan sebagai parameter
    const data = new URLSearchParams();
    data.append("grant_type", "password");
    data.append("client_secret", "0a40f69db4e5fd2f4ac65a090f31b823 ");
    data.append("client_id", "e78869f77986684a");
    data.append("username", username);
    data.append("password", password);

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error(
          "Unauthorized: Invalid username, password, client_id, or client_secret"
        );
      } else {
        console.error("Error during login:", error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="login border shadow-sm">
        <div className="logo mb-5">
          <img src={logo} alt="logo" />
        </div>
        <div>
          <p>Email</p>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow-sm"
          />
        </div>

        <div>
          <p>Password</p>
          <input
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm"
          />
        </div>

        <button className="shadow-sm" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
