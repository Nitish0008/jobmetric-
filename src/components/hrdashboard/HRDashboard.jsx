import HeaderHr from "../header/Headerhr";
import SearchBar from "../searchbar/SearchBar";
import JobPortal from "../joblisting/JobPortal";
import Footer from "../footer/Footer";

export default function HRDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HeaderHr />
      <SearchBar />
      <JobPortal />
      <Footer />
    </div>
  );
}
