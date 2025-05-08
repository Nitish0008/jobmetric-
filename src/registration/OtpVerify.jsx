import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state;

  const handleVerify = () => {
    // Normally verify OTP via backend
    if (otp === "123456") {
      if (user.role === "hr") navigate("/hr-dashboard");
      else navigate("/user-dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl border bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Verify OTP</h2>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text pb-2">Enter OTP sent to {user.email}</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="form-control mt-6">
            <button onClick={handleVerify} className="btn btn-primary">
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
