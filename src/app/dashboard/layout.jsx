import React from "react";

const DashboardLayout = ({ children, modal }) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default DashboardLayout;
