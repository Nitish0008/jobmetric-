import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";

export default function Header() {
  return (
    <div className="navbar bg-blue-500 shadow-sm px-4 sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white bg-black font-bold shadow">JobMetric</a>
      </div>

      <div className="flex items-center gap-4">
        {/* Message Icon */}
        <button className="btn btn-ghost btn-circle bg-black hover:bg-blue-900 transition duration-300 ease-in-out rounded-full p-2">
          <FaEnvelope className="text-xl text-white" />
        </button>

        {/* Notification Icon */}
        <button className="btn btn-ghost btn-circle bg-black hover:bg-blue-900 transition duration-300 ease-in-out rounded-full p-2">
          <FaBell className="text-xl text-white" />
        </button>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
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
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
