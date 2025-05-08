import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    // Normally send form data to backend and trigger OTP email
    // Simulate sending OTP and redirect
    navigate("/verify-otp", { state: formData });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl border bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Register</h2>

          {["FirstName", "LastName", "Email", "Password"].map((field) => (
            <div key={field} className="form-control">
              <label className="label">
                <span className="label-text pb-2 text-white">{field.replace(/([A-Z])/g, " $1")}</span>
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                placeholder={`Enter ${field}`}
                name={field}
                className="input input-bordered"
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text pb-2 text-white">Select Role</span>
            </label>
            <select
              className="select select-bordered"
              name="role"
              onChange={handleChange}
            >
              <option disabled selected value="">
                Select your role
              </option>
              <option value="hr">HR</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-control mt-6">
            <button onClick={handleRegister} className="btn btn-primary">
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
