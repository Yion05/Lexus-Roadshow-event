import axios from "axios";
import type { APIResponse } from "../types/types";
import baseURL, { summaryAPI } from "../api/summaryAPI";
import { useNavigate } from "react-router";

interface navigationCall {
  setCurrentView: React.Dispatch<React.SetStateAction<"dashboard" | "clients">>;
}

const Sidebar = ({ setCurrentView }: navigationCall) => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post<APIResponse<null>>(
        `${baseURL}/${summaryAPI.logoutAPI.url}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        alert(response.data.message);
        navigate("/");
      } else {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      alert(`Internal server error.`);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col w-64 bg-gray-800 fixed top-0 left-0 h-full z-40">
      <div className="flex items-center justify-center h-16 text-white bg-gray-900">
        <span className="text-xl font-bold">Admin Panel</span>
      </div>
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="flex items-center px-4 py-2 mt-2 text-gray-100 rounded hover:bg-gray-700"
        >
          <i className="fas fa-tachometer-alt"></i>
          <span className="ml-3">Dashboard</span>
        </button>
        <button
          onClick={() => setCurrentView("clients")}
          className="flex items-center px-4 py-2 mt-2 text-gray-100 rounded hover:bg-gray-700"
        >
          <i className="fas fa-users"></i>
          <span className="ml-3">Clients</span>
        </button>
        <button
          onClick={() => logout()}
          className="flex items-center px-4 py-2 mt-auto text-gray-100 rounded hover:bg-gray-700"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
