import { useEffect, useState } from "react";
import axios from "axios";

export default function JobDashboardHeader({ toggleSidebar }) {
  const [jobCount, setJobCount] = useState(null); // null to handle loading

  useEffect(() => {
    async function fetchJobCount() {
      try {
        const response = await axios.get("http://localhost:8080/api/jobs");
        console.log("Raw response:", response);

        if (response.status !== 200) {
          throw new Error("Failed to fetch jobs");
        }

        const data = response.data;
        console.log("Parsed job data:", data);

        // Handle both array and object structure
        const count = Array.isArray(data)
          ? data.length
          : Array.isArray(data.jobs)
          ? data.jobs.length
          : 0;

        setJobCount(count);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobCount(0);
      }
    }

    fetchJobCount();
  }, []);

  return (
    <div className="w-full bg-black p-4 shadow flex items-center justify-between sticky top-0 z-10">
      {/* Sidebar Toggle on Mobile */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="md:hidden mr-4 text-gray-600 focus:outline-none"
        >
          ☰
        </button>
        {jobCount === null ? (
  <span className="text-sm text-gray-300 animate-pulse">Loading jobs...</span>
) : (
  <h1 className="text-xl font-semibold text-white">
    Open and paused jobs ({jobCount})
  </h1>
)}

      </div>

      {/* Profile Dropdown */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://avatars.githubusercontent.com/u/118854191?v=4"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-white text-black rounded-box z-10 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  );
}
