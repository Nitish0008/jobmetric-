// In JobCard.jsx
import React from "react";

export const JobCard = ({ job, isSelected, onSelect }) => (
  <div
    className={`w-full mx-auto p-6 border rounded-lg cursor-pointer transition-shadow ${
      isSelected
        ? "bg-blue-50 border-blue-400 shadow-lg"
        : "bg-white border-gray-200 hover:shadow-md"
    }`}
    onClick={onSelect}
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h3>
    <p className="text-gray-600 mb-2">{job.companyName}</p>
    <p className="text-gray-600 mb-2">{job.location}</p>
    <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
      {job.jobType}
    </span>
  </div>
);
