import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("user");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = {
      email: loginData.email,
      password: loginData.password,
    };

    console.log("Login Data:", data);

    axios
      .post("http://localhost:8080/api/auth/login", data)
      .then((response) => {
        console.log("Login successful:", response.data.data.access_token);

        //decode the token to get user role
        const decodedToken = JSON.parse(
          atob(response.data.data.access_token.split(".")[1])
        );
        console.log("Decoded Token:", decodedToken);
        // Store the token and decodedToken in local storage or state management
        localStorage.setItem("access_token", response.data.data.access_token);
        sessionStorage.setItem("access_token", response.data.data.access_token);
        sessionStorage.setItem("user_role", decodedToken.role[0].authority);
        localStorage.setItem("user_role", decodedToken.role[0].authority);

        // Redirect based on role
        if (decodedToken.role[0].authority === "ROLE_HR") {
          navigate("/hr-dashboard");
        } else if (decodedToken.role[0].authority === "ROLE_USER") {
          navigate("/user-dashboard");
        } else {
          // You can use a custom notification component here
          // For now, fallback to alert for invalid role
          alert("Invalid role");
        }
        // Example: Replace alert with a styled notification
        // You can use a library like react-toastify for better notifications
        // toast.success("Login successful!");
        // For now, use a simple custom notification
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
        console.log("Login error:", error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl shadow-orange-100 border-2 border-amber-50 bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>

          {/* Role selection */}
          {/* <div className="form-control mb-4 border-1 rounded-2xl border-amber-100 shadow-2xl shadow-amber-50">
            <label className="label-text font-medium p-2 pt-2">Login as:</label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="role"
                value="hr"
                checked={role === "hr"}
                onChange={(e) => setRole(e.target.value)}
                className="radio radio-sm "
              />
              <span className="label-text p-3 ">HR</span>
            </label>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
                className="radio radio-sm mr-2"
              />
              <span className="label-text">User</span>
            </label>
          </div> */}

          <div className="form-control ">
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
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="input input-bordered"
            />
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover pt-2 text-warning"
              >
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
