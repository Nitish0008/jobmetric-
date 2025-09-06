import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state;
  console.log("User data from registration:", user);

  const handleVerify = () => {
    const data = {
      email: user.email,
      otp: otp,
    };

    axios
      .post("http://localhost:8080/api/auth/verify-otp", data)
      .then((response) => {
      // Show a styled notification instead of alert
      const notification = document.createElement("div");
      notification.innerText = "OTP verification successful!";
      notification.style.position = "fixed";
      notification.style.top = "30px";
      notification.style.right = "30px";
      notification.style.background = "#22c55e";
      notification.style.color = "#fff";
      notification.style.padding = "16px 24px";
      notification.style.borderRadius = "8px";
      notification.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      notification.style.fontSize = "1rem";
      notification.style.zIndex = 9999;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
        navigate("/", {
        state: { email: user.email, role: user.role },
        });
      }, 2000);
      })
      .catch((error) => console.log(error.response.data));
  };
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-2xl border bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Verify OTP</h2>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text pb-2">
                Enter OTP sent to {user.email}
              </span>
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
