import React, { useState ,useRef} from "react";
import axios from "axios";
import { Briefcase, MapPin, IndianRupee, Users, List } from "lucide-react";

// Example utility function (optional)
const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

export const JobDetails = ({ job }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef();
  if (!job) {
    return (
      <div className="md:w-1/2 flex items-center justify-center text-gray-400 text-lg">
        👈 Select a job to view details
      </div>
    );
  }
const token = localStorage.getItem("access_token"); 
 
  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(null);
      setUploadError(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file first.");
      return;
    }

    setUploading(true);
    setUploadSuccess(null);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", "Test File");
      formData.append("description", "This is a sample file upload");

      // Replace {job.id} with actual job ID if available
      const response = await axios.post(
        `http://localhost:8080/api/applications/${job.id}`,
        formData,
        {
          headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // ✅ Add this line
    },
        }
      );

      setUploadSuccess("Upload successful!");
      setSelectedFile(null);
    } catch (error) {
      setUploadError(
       error.response?.data.error || "Upload failed. Please try again."
      );
      console.error("Upload error:", error.response?.data.error);
      setSelectedFile(null);
    } finally {
     setUploading(false);
    setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // ⬅️ Reset input visually    
      }
    }
  };

  return (
    <div className="md:w-1/2 bg-gradient-to-br from-blue-100 via-white to-blue-50 p-8 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          {job.title || "No Title"}
        </h2>
        <p className="text-gray-600 mb-2 flex items-center">
          <Briefcase className="inline w-4 h-4 mr-1" /> {job.companyName}
        </p>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="inline w-4 h-4 mr-1" /> {job.location || "Unknown Location"}
        </p>
        <p className="text-green-700 font-medium mb-4 flex items-center">
          <IndianRupee className="inline w-4 h-4 mr-1" /> {job.salary || "Not Disclosed"}
        </p>
        <p className="text-green-700 font-medium mb-4 flex items-center">{job.workMode}</p>

        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <p>
            <Users className="inline w-4 h-4 mr-1" /> {job.experience || "N/A"} experience • {job.education || "N/A"}
          </p>
          <p>
            <List className="inline w-4 h-4 mr-1" /> Skills: {job.category}
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <button className="btn" onClick={() => document.getElementById("my_modal_3").showModal()}>
            Apply Job
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>

              <div className="flex flex-col items-center">
                <input
                  type="file"
                  className="file-input file-input-primary w-96"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="pt-4 flex flex-col items-center">
                <button
                  className={`btn join-item bg-blue-500 ${uploading ? "loading" : ""}`}
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Resume"}
                </button>
              </div>

              {uploadSuccess && <p className="mt-2 text-green-600">{uploadSuccess}</p>}
              {uploadError && <p className="mt-2 text-red-600">{uploadError}</p>}
            </div>
          </dialog>

          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Save Job
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-black underline">Job Description</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description || "No description provided."}</p>
        </div>
      </div>
    </div>
  );
};