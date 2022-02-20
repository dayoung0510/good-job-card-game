import React from "react";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const GameOverModal: React.FC<Props> = ({ handleClose, open }) => {
  const router = useRouter();

  const handleNextPage = () => {
    handleClose;
    router.push("/result");
  };

  return (
    <>
      {open ? (
        <div className="back">
          <div className="container">
            <div>over!</div>
            <div className="btn-container">
              <button
                type="button"
                className="close-btn bg-midsky"
                onClick={handleNextPage}
              >
                결과확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <style jsx>{`
        .back {
          width: 100vw;
          height: 100vh;
          position: absolute !important;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: rgba(0, 0, 0, 0.75);
        }
        .container {
          width: 20rem;
          height: 20rem;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          position: relative;
          padding: 1rem;
          border-radius: 1rem;
        }
        .btn-container {
          position: absolute;
          bottom: 1rem;
        }
        .close-btn {
          font-size: 1.5rem;
          font-family: "Gong";
          color: #fff;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default GameOverModal;
