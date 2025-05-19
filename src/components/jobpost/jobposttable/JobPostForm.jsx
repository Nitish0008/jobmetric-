"use client";

import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  CalendarIcon,
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
  GraduationCapIcon,
  ClockIcon,
  UsersIcon,
  TagIcon,
} from "lucide-react";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    description: "",
    location: "",
    isActive: true,
    experience: "",
    education: "",
    numberOfPost: 1,
    jobType: "Full-time",
    deadline: null,
    workMode: "Onsite",
    categoryIds: [],
  });

  const [activeTab, setActiveTab] = useState("basic");

  const categories = [
    { id: "1", name: "Software Development" },
    { id: "2", name: "Marketing" },
    { id: "3", name: "Design" },
    { id: "4", name: "Sales" },
    { id: "5", name: "Customer Service" },
    { id: "6", name: "Finance" },
    { id: "7", name: "Human Resources" },
    { id: "8", name: "Data Science" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => {
      const isSelected = prev.categoryIds.includes(categoryId);
      const updatedCategories = isSelected
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId];

      return {
        ...prev,
        categoryIds: updatedCategories,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.error("No auth token found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/jobs",
        {
          ...formData,
          deadline: formData.deadline?.toISOString() || null,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const isLastTab = activeTab === "categories";
  const isFirstTab = activeTab === "basic";

  const moveToNextTab = () => {
    if (activeTab === "basic") setActiveTab("details");
    else if (activeTab === "details") setActiveTab("categories");
  };

  const moveToPreviousTab = () => {
    if (activeTab === "categories") setActiveTab("details");
    else if (activeTab === "details") setActiveTab("basic");
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-black">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6" />
            Post a New Job
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-3 border rounded-md overflow-hidden">
            {["basic", "details", "categories"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-center transition-colors ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab === "basic" && "Basic Info"}
                {tab === "details" && "Job Details"}
                {tab === "categories" && "Categories"}
              </button>
            ))}
          </div>

          {/* Basic Tab */}
          {activeTab === "basic" && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                    Job Title *
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder="Senior Developer"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <BuildingIcon className="h-4 w-4 text-blue-600" />
                    Company Name *
                  </label>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 font-medium">
                  <TagIcon className="h-4 w-4 text-blue-600" />
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Job description..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <MapPinIcon className="h-4 w-4 text-blue-600" />
                    Location *
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <BuildingIcon className="h-4 w-4 text-blue-600" />
                    Work Mode
                  </label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                  >
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <label>Publish job immediately</label>
              </div>
            </>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                    Experience Required
                  </label>
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder="e.g. 2+ years"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <GraduationCapIcon className="h-4 w-4 text-blue-600" />
                    Education
                  </label>
                  <input
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder="e.g. B.Tech, MBA"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <UsersIcon className="h-4 w-4 text-blue-600" />
                    Number of Posts
                  </label>
                  <input
                    type="number"
                    name="numberOfPost"
                    value={formData.numberOfPost}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 font-medium">
                    <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 font-medium mt-4">
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                  Application Deadline
                </label>
                <DatePicker
                  selected={formData.deadline}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, deadline: date }))
                  }
                  className="border px-3 py-2 rounded-md w-full"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select deadline"
                />
              </div>
            </>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {!isFirstTab && (
              <button
                type="button"
                onClick={moveToPreviousTab}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Previous
              </button>
            )}
            {!isLastTab ? (
              <button
                type="button"
                onClick={moveToNextTab}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Submit Job
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
