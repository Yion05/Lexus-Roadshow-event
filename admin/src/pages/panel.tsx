
import React from "react";
import Clients from "../components/client";
import Dashboard from "../components/dashboard";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const AdminPanel = () => {
    const [currentView, setCurrentView] = React.useState<"dashboard" | "clients">("dashboard");

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar setCurrentView={setCurrentView}/>
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-grow p-6 overflow-auto bg-gray-100 ml-64 transition-all">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'clients' && <Clients />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel