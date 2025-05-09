// JobPortal.jsx
import React, { useState } from "react";
import { JobList } from "../joblisting/JobList";
import { JobDetails } from "../joblisting/JobDetails";
import { jobs } from "../data/data";

export default function JobPortal() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <JobList jobs={jobs} selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
      <JobDetails job={selectedJob} />
    </div>
  );
}
