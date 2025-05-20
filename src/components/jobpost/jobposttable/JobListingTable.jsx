"use client";

import React, { useState } from "react";
import {
  ArrowUpDown,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Users,
} from "lucide-react";

import axios from "axios";
import { useEffect } from "react";

export default function JobListingTable() {
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

  // Sample data for the table

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to the data
  const sortedJobs = React.useMemo(() => {
    const sortableJobs = [...jobs];
    if (sortConfig.key) {
      sortableJobs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableJobs;
  }, [jobs, sortConfig]);

  // Handle delete job
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  // Handle update job
  const handleUpdate = (id) => {
    // In a real app, this would open an edit form or navigate to an edit page
    console.log(`Update job with id: ${id}`);
    alert(`Edit job with ID: ${id}`);
  };

  // Render status badge with appropriate color
  const renderStatus = (status) => {
  if (status === true || status === "Active") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </span>
    );
  }

  if (status === false || status === "Closed") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <XCircle className="w-3 h-3 mr-1" />
        Closed
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </span>
    );
  }

  return <span>{status}</span>;
};


  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Job Listings</h2>
          <p className="text-blue-100">Manage your job postings</p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort("title")}
                  >
                    <div className="flex items-center">
                      Job Title
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort("candidates")}
                  >
                    <div className="flex items-center">
                      Candidates
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort("datePosted")}
                  >
                    <div className="flex items-center">
                      Date Posted
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 text-black">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-1" />
                        {job.candidates}
                      </div>
                    </td>
                    <td className="px-6 py-4">{renderStatus(job.active)}</td>
                    <td className="px-6 py-4 text-black">
                      {formatDate(job.deadLine)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleUpdate(job.id)}
                          className="p-1 text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
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
      </div>
    </div>
  );
}
