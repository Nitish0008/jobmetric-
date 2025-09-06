"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  FileText,
} from "lucide-react";
import axios from "axios";

export default function JobListingTable() {
  const [jobs, setJobs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [applicationCounts, setApplicationCounts] = useState({});
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const access_token = useMemo(() => localStorage.getItem("access_token"), []);

  const handleGetJobs = async () => {
    if (!access_token) return;
    try {
      const response = await axios.get("http://localhost:8080/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const jobs = response?.data?.data || [];
      setJobs(jobs);

      // const counts = {};
      // await Promise.all(
      //   jobs.map(async (job) => {
      //     const res = await axios.get(
      //       `http://localhost:8080/api/applications/${job.id}`,
      //       { headers: { Authorization: `Bearer ${access_token}` } }
      //     );
      //     counts[job.id] = res.data?.length || 0;
      //   })
      // );
      // setApplicationCounts(counts);
      console.log(jobs);
    } catch (error) {
      console.error(
        "Error fetching jobs:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    handleGetJobs();
  }, [access_token]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedJobs = useMemo(() => {
    const sortableJobs = [...jobs];
    if (sortConfig.key) {
      sortableJobs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableJobs;
  }, [jobs, sortConfig]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;
    try {
      await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error(
        "Error deleting job:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdate = async () => {
    const newTitle = prompt("Enter the new job title for all job posts:");
    if (!newTitle) return;
    try {
      await Promise.all(
        jobs.map((job) =>
          axios.patch(
            `http://localhost:8080/api/jobs/${job.id}`,
            { title: newTitle },
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          )
        )
      );
      setJobs((prev) => prev.map((job) => ({ ...job, title: newTitle })));
    } catch (error) {
      console.error(
        "Error updating all jobs:",
        error.response?.data || error.message
      );
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/jobs/${id}/status`,
        { active: !currentStatus },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, active: !currentStatus } : job
        )
      );
    } catch (error) {
      console.error(
        "Error toggling job status:",
        error.response?.data || error.message
      );
    }
  };

  const handleJobClick = async (jobId, title) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/applications/${jobId}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      setSelectedJobTitle(title);
      setSelectedApplications(res.data.data || []);
      setIsDialogOpen(true);
      console.log("Applications for job:", res.data.data);
    } catch (error) {
      console.error(
        "Error fetching applications:",
        error.response?.data || error.message
      );
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderStatus = (status) => {
    if (status === true || status === "Active") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <XCircle className="w-3 h-3 mr-1" />
        Deactive
      </span>
    );
  };

  return (
    <div className="w-full mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Job Listings</h2>
          <p className="text-blue-100">Manage your job postings</p>
        </div>

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Applications</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedJobs.map((job) => (
                <tr key={job.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-blue-700">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-black">
                    <div className="flex items-center">
                      {/* <FileText className="h-4 w-4 text-gray-500 mr-1" />
          <span className="ml-2 text-xs text-gray-500">
            {applicationCounts[job.id] ?? 0} Applicants
          </span> */}
                      <div
                        className="ml-2 text-blue-600 hover:underline cursor-pointer"
                        onClick={async () => {
                          await handleJobClick(job.id, job.title);
                          document.getElementById("my_modal_3").showModal();
                        }}
                      >
                        <button className="btn btn-outline btn-error">View Applications </button>
                        
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{renderStatus(job.active)}</td>
                  <td className="px-6 py-4 text-black">
                    {formatDate(job.deadLine)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="p-1 text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(job.id, job.active)}
                        className="p-1 text-yellow-600 hover:text-yellow-900"
                        title="Toggle Status"
                      >
                        {job.active ? (
                          <ToggleRight className="h-4 w-4" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-1 text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr className="bg-white">
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No job listings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal using <dialog> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-xl font-bold mb-2 btn">
            Job Name: {selectedJobTitle}
          </h2>
          <p className="mb-4 text-white bg-blue-600 p-2 rounded">
            Total Applicants: <span className="font-semibold">{selectedApplications.length}</span>
          </p>
          {selectedApplications.length === 0 ? (
            <p className="text-gray-600">No applications found for this job.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">File Name</th>
                    {/* <th className="px-4 py-2">File Type</th> */}
                    <th className="px-4 py-2">Applied At</th>
                    <th className="px-4 py-2">User Name</th>
                    <th className="px-4 py-2">User Email</th>
                    <th className="px-4 py-2">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedApplications.map((app, index) => (
                    <tr key={index} className="border-b">
                      {/* <td className="px-4 py-2">{app.fileName}</td> */}
                      <td className="px-4 py-2">{app.fileType}</td>
                      <td className="px-4 py-2">{app.appliedAt}</td>
                      <td className="px-4 py-2">{app.userName}</td>
                      <td className="px-4 py-2">{app.userEmail}</td>
                      <td className="px-4 py-2">
                        <a
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            try {
                              const access_token =
                                localStorage.getItem("access_token");
                              const response = await axios.get(
                                `http://localhost:8080/api/applications/${app.id}/resume`,
                                {
                                  responseType: "blob",
                                  headers: {
                                    Authorization: `Bearer ${access_token}`,
                                  },
                                }
                              );
                              const blob = new Blob([response.data], {
                                type: "application/pdf",
                              });
                              const url = window.URL.createObjectURL(blob);
                              window.open(url, "_blank");
                            } catch (error) {
                              console.error("Error fetching resume:", error);
                              alert("Failed to fetch resume");
                            }
                          }}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          <button className="btn btn-outline btn-success">
                            View Resume
                          </button>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
