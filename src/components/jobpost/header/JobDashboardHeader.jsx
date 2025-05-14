export default function JobDashboardHeader({ toggleSidebar }) {
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
        <h1 className="text-xl font-semibold text-white">Open and paused jobs (6)</h1>
      </div>

      {/* Profile Dropdown */}
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
