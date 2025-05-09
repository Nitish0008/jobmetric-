import React from "react";
import { Briefcase, MapPin, IndianRupee } from "lucide-react";

export const JobCard = ({ job, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border rounded-xl p-4 hover:shadow-md transition-all ${
        isSelected ? "border-blue-500 bg-blue-50" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* <img src={job.logo} alt={job.company} className="w-10 h-10 rounded" /> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            <Briefcase className="inline w-4 h-4 mr-1" /> {job.company}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {(job.tags || []).map((tag, i) => (
          <span key={i} className="bg-blue-600 text-sm px-2 py-1 rounded-full text-white">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
