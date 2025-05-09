import React from "react";
import { Briefcase, MapPin, IndianRupee, Users, List } from "lucide-react";

export const JobDetails = ({ job }) => {
  if (!job) {
    return <div className="md:w-1/2 flex items-center justify-center text-gray-400 text-lg">👈 Select a job to view details</div>;
  }

  return (
    <div className="md:w-1/2 bg-gradient-to-br from-blue-100 via-white to-blue-50 p-8 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{job.title}</h2>
        <p className="text-gray-600 mb-2 flex items-center">
          <Briefcase className="inline w-4 h-4 mr-1" /> {job.company}
        </p>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="inline w-4 h-4 mr-1" /> {job.location}
        </p>
        <p className="text-green-700 font-medium mb-4 flex items-center">
          <IndianRupee className="inline w-4 h-4 mr-1" /> {job.salary}
        </p>
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <p><Users className="inline w-4 h-4 mr-1" /> {job.companySize} employees • {job.industry}</p>
          <p><List className="inline w-4 h-4 mr-1" /> Skills: {job.skills.join(", ")}</p>
        </div>
        <div className="flex gap-3 mb-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition">
            Apply Now
          </button>
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Save Job
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-black underline">Job Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>
      </div>
    </div>
  );
};