// "use client"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



import { useState } from "react";
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
    deadline: "",
    workMode: "Onsite",
    categoryIds: [],
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
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
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });

    setFormData((prev) => ({
      ...prev,
      categoryIds: selectedCategories.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // handle submission
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
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
    
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6" />
            Post a New Job
          </h2>
          <p className="text-blue-100">
            Fill out the form below to create a new job posting
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Tabs */}
            <div className="w-full">
              <div className="grid grid-cols-3 mb-8 border rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleTabChange("basic")}
                  className={`py-2 px-4 text-center transition-colors ${
                    activeTab === "basic"
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("details")}
                  className={`py-2 px-4 text-center transition-colors ${
                    activeTab === "details"
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Job Details
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("categories")}
                  className={`py-2 px-4 text-center transition-colors ${
                    activeTab === "categories"
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Categories
                </button>
              </div>

              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="title"
                          className="flex items-center gap-2 font-medium text-black"
                        >
                          <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                          Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g. Senior React Developer"
                          className="w-full px-3 py-2 border text-black border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="companyName"
                          className="flex items-center gap-2 font-medium text-black"
                        >
                          <BuildingIcon className="h-4 w-4 text-blue-600" />
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="e.g. Acme Inc."
                          className="w-full px-3 py-2 border text-black border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="flex items-center gap-2 font-medium text-black"
                      >
                        <TagIcon className="h-5 w-4 text-blue-600" />
                        Job Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the job responsibilities, requirements, and benefits..."
                        className="w-full px-3 text-black py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-20"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="location"
                          className="flex items-center gap-2 font-medium text-black"
                        >
                          <MapPinIcon className="h-4 w-4 text-blue-600" />
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g. New York, NY"
                          className="w-full px-3 py-2 text-black border  border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="workMode"
                          className="flex items-center gap-2 font-medium text-black"
                        >
                          <BuildingIcon className="h-4 w-4 text-blue-600" />
                          Work Mode
                        </label>
                        <select
                          id="workMode"
                          name="workMode"
                          value={formData.workMode}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                        >
                          <option value="Onsite">Onsite</option>
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 ">
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isActive"
                        className="font-medium text-black"
                      >
                        Publish job immediately
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Job Details Tab */}
              {activeTab === "details" && (
                <div className="space-y-6 mt-4 text-black">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="experience"
                          className="flex items-center gap-2 font-medium"
                        >
                          <ClockIcon className="h-4 w-4 text-blue-600" />
                          Experience Required
                        </label>
                        <input
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="e.g. 3-5 years"
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="education"
                          className="flex items-center gap-2 font-medium"
                        >
                          <GraduationCapIcon className="h-4 w-4 text-blue-600" />
                          Education Required
                        </label>
                        <input
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          placeholder="e.g. Bachelor's Degree"
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="jobType"
                          className="flex items-center gap-2 font-medium"
                        >
                          <BriefcaseIcon className="h-4 w-4 text-blue-600" />
                          Job Type
                        </label>
                        <select
                          id="jobType"
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="numberOfPost"
                          className="flex items-center gap-2 font-medium"
                        >
                          <UsersIcon className="h-4 w-4 text-blue-600" />
                          Number of Positions
                        </label>
                        <input
                          id="numberOfPost"
                          name="numberOfPost"
                          type="number"
                          min="1"
                          value={formData.numberOfPost}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="deadline"
                        className="flex items-center gap-2 font-medium"
                      >
                        <CalendarIcon className="h-4 w-4 text-blue-600" />
                        Application Deadline
                      </label>
                      <DatePicker
                        id="deadline"
                        selected={formData.deadline}
                        onChange={(date) =>
                          setFormData({ ...formData, deadline: date })
                        }
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select deadline"
                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Categories Tab */}
              {activeTab === "categories" && (
                <div className="space-y-6 mt-4 text-black">
                  <div className="space-y-4 ">
                    <label className="flex items-center gap-2 mb-4 font-medium">
                      <TagIcon className="h-4 w-4 text-blue-600" />
                      Job Categories (Select all that apply)
                    </label>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2 "
                        >
                          <input
                            type="checkbox"
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="font-medium "
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>

                    {selectedCategories.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                          Selected categories:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCategories.map((id) => {
                            const category = categories.find(
                              (c) => c.id === id
                            );
                            return (
                              <span
                                key={id}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                              >
                                {category?.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={moveToPreviousTab}
                disabled={isFirstTab}
                className={`px-4 py-2 border border-blue-200 rounded-md text-blue-700 hover:bg-blue-50 transition-colors ${
                  isFirstTab ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>

              {isLastTab ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Submit Job Posting
                </button>
              ) : (
                <button
                  type="button"
                  onClick={moveToNextTab}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}