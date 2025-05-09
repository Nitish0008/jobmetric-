import React from "react";
import { JobCard } from "./JobCard";

export const JobList = ({ jobs, selectedJob, setSelectedJob }) => (
  <div className="md:w-1/2 p-6 overflow-y-auto bg-white border-r">
    <h2 className="text-2xl font-bold mb-6 text-black">Jobs For You</h2>
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSelected={selectedJob?.id === job.id}
          onSelect={() => setSelectedJob(job)}
        />
      ))}
    </div>
  </div>
);