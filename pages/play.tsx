import React, { useEffect } from "react";
import { useGameContext } from "./contexts/GameContext";
import Result from "./result";

const Play: React.FC = () => {
  const {
    state: { second, stage },
    dispatch,
  } = useGameContext();

  useEffect(() => {
    const countDown = setInterval(() => {
      if (second === 0) {
        dispatch({ type: "SET_NEXT_STAGE" });
      } else {
        dispatch({ type: "SET_TIME" });
        clearInterval(countDown);
      }
    }, 1000);

    return () => clearInterval(countDown);
  }, [second]);

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="second bg-yellow ft-navy">{second}</div>
          <div className="stage ft-yellow">stage {stage}</div>
        </div>

        <div className="mid">
          <div className="card bg-sky">sdf</div>
        </div>

        <div className="right">werwer</div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          padding: 2rem;
          display: flex;
        }
        .second {
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3rem;
          font-weight: 800;
        }
        .card {
          width: 15rem;
          height: 20rem;
          border-radius: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .left {
          width: 30%;
          height: 100%;
        }
        .mid {
          width: 40%;
          height: 100%;
          background: yellow;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .right {
          width: 30%;
          height: 100%;
          background: green;
        }
        .stage {
          width: 10rem;
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Play;
