import React from "react";

const layout = ({ modal, children }) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default layout;
