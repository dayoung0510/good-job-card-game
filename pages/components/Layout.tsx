import React from "react";
import NavBar from "./NavBar";
import Seo from "./Seo";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container">
      <Seo title="Good job card game" />
      <NavBar />
      <div className="content">{children}</div>

      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
          }
          .content {
            width: 100%;
            height: calc(100% - 3rem);
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
