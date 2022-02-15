import React from "react";

const NavBar: React.FC = () => {
  return (
    <div>
      <div className="bar bg-dark ft-sky ft-200">
        What Is Your Ideal Work Environment?
      </div>
      <style jsx>{`
        .bar {
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          letter-spacing: 4px;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
