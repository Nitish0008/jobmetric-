import React, { useState } from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
import axios from "axios";

export default function Header() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");

  const fetchSavedJobs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:8080/api/save-job", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedJobs(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      setError("Failed to load saved jobs.");
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleEnvelopeClick = async () => {
    if (showSavedJobs) {
      setShowSavedJobs(false);
    } else {
      await fetchSavedJobs();
      setShowSavedJobs(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <div className="navbar bg-blue-500 shadow-sm px-4 sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white bg-black font-bold shadow">
          JobMetric
        </a>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Envelope Button */}
        <button
          className="btn btn-ghost btn-circle bg-black hover:bg-blue-900 transition duration-300 ease-in-out rounded-full p-2"
          onClick={handleEnvelopeClick}
          aria-label="Show saved jobs"
        >
          <FaEnvelope className="text-xl text-white" />
        </button>

        {/* Saved Jobs Panel */}
        {showSavedJobs && (
          <div className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-auto bg-white rounded shadow-lg p-4 z-50 text-black">
            <h3 className="font-bold mb-3">Saved Jobs</h3>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && savedJobs.length === 0 && <p>No saved jobs.</p>}

            {!loading && !error && savedJobs.length > 0 && (
              <ul className="space-y-2">
                {savedJobs.map((job) => (
                  <li key={job.id} className="border-b pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{job.title || "Untitled Job"}</p>
                        <p className="text-sm text-gray-600">{job.companyName || "Unknown Company"}</p>
                        <p className="text-xs text-gray-500">{job.location || "Location not specified"}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-500 hover:text-red-700 text-sm ml-2"
                        title="Remove job"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Notification Icon */}
        <button
          className="btn btn-ghost btn-circle bg-black hover:bg-blue-900 transition duration-300 ease-in-out rounded-full p-2"
          aria-label="Notifications"
        >
          <FaBell className="text-xl text-white" />
        </button>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://avatars.githubusercontent.com/u/118854191?v=4"
              />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white text-black rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
