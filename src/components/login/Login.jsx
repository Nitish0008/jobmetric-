import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "hr") {
      navigate("/hr-dashboard");
    } else {
      navigate("/user-dashboard");
    }
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
