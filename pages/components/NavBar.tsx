import React from "react";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <div>
      <div className="bar bg-dark ft-sky ft-200">
        <div className="home ft-midsky">
          <Link href="/">HOME</Link>
        </div>
        <div>What Is Your Ideal Work Environment?</div>
      </div>

      <style jsx>{`
        .bar {
          position: relative;
          height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          letter-spacing: 4px;
          font-size: 0.8rem;
        }
        .home {
          position: absolute;
          left: 1rem;
        }
      `}</style>
    </div>
  );
};

export default NavBar;
