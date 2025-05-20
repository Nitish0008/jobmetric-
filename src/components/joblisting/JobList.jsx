import React, { useEffect, useState } from "react";
import axios from "axios";
import { JobCard } from "./JobCard";

export const JobList = ({ selectedJob, setSelectedJob }) => {
  const [jobs, setJobs] = useState([]);

  const handleGetJobs = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.error("No auth token found.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/jobs", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("Jobs fetched successfully:", response.data);
      setJobs(response?.data?.data);
    } catch (error) {
      console.error(
        "Error fetching jobs:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    handleGetJobs();
  }, []);

  return (
    <div className="md:w-1/2 p-6 overflow-y-auto bg-white border-r">
      <h2 className="text-2xl font-bold mb-6 text-black">Jobs For You</h2>
      <div className="space-y-4">
        {jobs?.map((job) => (
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
};