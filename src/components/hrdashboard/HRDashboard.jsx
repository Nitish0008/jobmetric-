import HeaderHr from "../header/Headerhr";
import SearchBar from "../searchbar/SearchBar";
import JobPortal from "../joblisting/JobPortal";

export default function HRDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderHr />
      <SearchBar />
      <JobPortal />
      
    </div>
  );
}
