import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    // ✅ Clear previous session and local storage data
    sessionStorage.clear();
    localStorage.clear();

    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    console.log("Login Data:", data);

    axios
      .post("http://localhost:8080/api/auth/login", data)
      .then((response) => {
        const token = response.data.data.access_token;
        console.log("Login successful:", token);

        // ✅ Decode JWT token to extract user role
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.role[0].authority;
        console.log("Decoded Token:", decodedToken);

        // ✅ Store token and role
        sessionStorage.setItem("access_token", token);
        sessionStorage.setItem("user_role", userRole);
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_role", userRole);

        // ✅ Redirect user based on role
        if (userRole === "ROLE_HR") {
          navigate("/hr-dashboard");
        } else if (userRole === "ROLE_USER") {
          navigate("/user-dashboard");
        } else {
          alert("Invalid role");
        }

        // ✅ Notification (simple custom toast)
        const notification = document.createElement("div");
        notification.innerText = "Login successful!";
        notification.style.position = "fixed";
        notification.style.top = "20px";
        notification.style.right = "20px";
        notification.style.background = "#22c55e";
        notification.style.color = "white";
        notification.style.padding = "16px 24px";
        notification.style.borderRadius = "8px";
        notification.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        notification.style.zIndex = 9999;
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 2000);
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl border-2 border-amber-50 bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text pb-2 text-white">Email</span>
            </label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              placeholder="email@example.com"
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text pb-2 text-white">Password</span>
            </label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              placeholder="••••••••"
              className="input input-bordered"
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover pt-2 text-warning">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
