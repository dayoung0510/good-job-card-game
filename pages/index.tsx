import React, { useEffect } from "react";
import Link from "next/link";
import { useGameContext } from "./contexts/GameContext";

const Home: React.FC = () => {
  const { state, dispatch } = useGameContext();

  useEffect(() => {
    dispatch({ type: "CHANGE_GAME_STATE", state: false });
    dispatch({ type: "INITIALIZE" });
  }, []);

  console.log(state.isPlaying);

  return (
    <div className="container">
      <Link href="/play">
        <button type="button" className="btn bg-yellow ft-gong ft-dark fw-800">
          START
        </button>
      </Link>

      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .btn {
          padding: 1rem 2rem;
          font-size: 2rem;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Home;
