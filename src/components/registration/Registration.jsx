import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    contact: "",
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("Form Data:", formData);

    // Normally send form data to backend and trigger OTP email
    axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        // Redirect to OTP verification page
        navigate("/verify-otp", {
          state: { email: formData.email, role: formData.role },
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
          contact: "",
        });
      })
      .catch((error) => {
        console.log("Registration error:", error);
        alert(`Registration failed. ${error} Please try again`);
        // Handle error (e.g., show a message to the user)
      });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-sm">
        <h1 className="text-center pt-6 text-2xl">Register Here</h1>
        <div className="card-body flex flex-col items-center gap-6">
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            name="firstName"
            placeholder="Name"
            className="input"
          />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            name="lastName"
            placeholder="Last Name"
            className="input"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            name="email"
            placeholder="Email"
            className="input"
          />
          <input
            type="number"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            name="contact"
            placeholder="Contact"
            className="input"
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            name="password"
            placeholder="Password"
            className="input"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="select"
            required
          >
            <option value="" disabled>
              Pick Role
            </option>
            <option value="HR">HR</option>
            <option value="USER">USER</option>
          </select>

          <button onClick={handleRegister} className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
