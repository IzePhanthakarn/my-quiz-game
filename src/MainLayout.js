import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="m-full h-full flex items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;