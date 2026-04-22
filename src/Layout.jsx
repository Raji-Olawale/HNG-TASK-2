import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";

const Layout = () => {
  const location = useLocation();
  const showHeader = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#F8F8FB] pl-24 flex justify-center">
      <Sidebar />
      <main className="max-w-3xl w-full pt-16 px-4 flex-1">
        {showHeader && <Header />}
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
};

export default Layout;
