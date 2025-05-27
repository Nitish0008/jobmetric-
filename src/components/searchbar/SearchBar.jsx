import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // ✅ JWT token stored from login

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:8080/api/jobs/search?keyword=${encodeURIComponent(keyword)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-4 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Find Your Dream Job
      </h1>
      <div className="flex items-center gap-2 w-full max-w-2xl bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-2xl">
        <FaSearch className="text-blue-800 text-lg" />
        <input
          type="text"
          placeholder="Search job here"
          className="flex-grow outline-none text-black bg-transparent"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Job"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="w-full max-w-2xl mt-4">
        {!loading && results.length === 0 && keyword.trim() && !error && (
          <p className="text-gray-500">No jobs found.</p>
        )}
        {results.length > 0 && (
          <ul className="list-disc pl-5">
            {results.map((job, idx) => (
              <li key={idx}>{job.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
