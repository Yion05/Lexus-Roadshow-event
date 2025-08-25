import React from "react";
import { getTotalItems } from "../data/data";

const Dashboard = () => {
  const [currentItem, setCurrentItem] = React.useState<number>(0);

  React.useEffect(()=>{
    const setNumber = async () =>{
      setCurrentItem(await getTotalItems());
    }
    setNumber();
  },[])

  return (
    <div id="dashboard-view">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Total Submitted Form</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{currentItem}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;