"use client";

import { useState, useEffect, useRef } from "react";

export default function EnhancedSearchBar() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const trendingKeywords = [
    "React Developer",
    "Frontend Engineer",
    "Full Stack",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "Backend Developer",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (keyword.trim().length > 0) {
      const filtered = trendingKeywords.filter((item) =>
        item.toLowerCase().includes(keyword.toLowerCase())
      );
      const recentFiltered = recentSearches.filter((item) =>
        item.toLowerCase().includes(keyword.toLowerCase())
      );
      const newSuggestions = [
        ...recentFiltered.map((text) => ({ text, type: "recent" })),
        ...filtered.map((text) => ({ text, type: "trending" })),
      ].slice(0, 6);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      const recentSuggestions = recentSearches.slice(0, 3).map((text) => ({
        text,
        type: "recent",
      }));
      const trendingSuggestions = trendingKeywords.slice(0, 3).map((text) => ({
        text,
        type: "trending",
      }));
      setSuggestions([...recentSuggestions, ...trendingSuggestions]);
    }
  }, [keyword, recentSearches]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveToRecentSearches = (searchTerm) => {
    const updated = [searchTerm, ...recentSearches.filter((item) => item !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const handleSearch = async (searchTerm) => {
    const searchKeyword = searchTerm || keyword;
    if (!searchKeyword.trim()) return;

    setLoading(true);
    setError("");
    setShowSuggestions(false);
    saveToRecentSearches(searchKeyword);

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://localhost:8080/api/jobs/search?keyword=${encodeURIComponent(searchKeyword)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      const filtered = data.filter((job) => {
        const searchLower = searchKeyword.toLowerCase();
        return (
          job.title?.toLowerCase().includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.company?.toLowerCase().includes(searchLower)
        );
      });

      setResults(filtered);
      setKeyword(searchKeyword);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    handleSearch(suggestion);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent_searches");
  };

  const highlightMatch = (text, keyword) => {
    if (!keyword.trim()) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-4 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Find Your Dream Job</h1>

      <div ref={searchRef} className="relative w-full max-w-2xl">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            className="flex-grow outline-none text-black bg-transparent"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
              else if (e.key === "Escape") setShowSuggestions(false);
            }}
          />

          {keyword && (
            <button onClick={() => { setKeyword(""); inputRef.current?.focus(); }} className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {suggestions.length > 0 ? (
              <div className="py-2">
                {recentSearches.length > 0 && keyword.trim() === "" && (
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Recent Searches
                      </span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-100 rounded"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    {suggestion.type === "recent" ? (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )}
                    <span className="flex-grow">{highlightMatch(suggestion.text, keyword)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${suggestion.type === "recent" ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-600"}`}>
                      {suggestion.type === "recent" ? "Recent" : "Trending"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">No suggestions found</div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 w-full max-w-2xl">
          {error}
        </div>
      )}

      <div className="w-full max-w-4xl mt-6">
        {!loading && results.length === 0 && keyword.trim() && !error && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No jobs found matching "{keyword}"</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid gap-4 mt-6">
            {results.map((job, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-blue-800">{job.title}</h2>
                <p className="text-sm text-gray-700">{job.company}</p>
                <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}   