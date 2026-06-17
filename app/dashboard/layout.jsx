import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="page-shell py-8">{children}</div>
    </div>
  );
};

export default DashboardLayout;
