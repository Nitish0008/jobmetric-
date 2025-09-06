import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SearchBar from "../searchbar/SearchBar";
import JobPortal from "../joblisting/JobPortal";

export default function UserDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <SearchBar />
      <JobPortal />  
      <Footer />
    </div>
  );
}
