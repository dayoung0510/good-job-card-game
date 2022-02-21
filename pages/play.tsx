import React, { useEffect, useState } from 'react';
import { useGameContext } from './contexts/GameContext';
import GameOverModal from './components/GameOverModal';
import { USER_ID, BOT_ID } from './contexts/GameContext';
import ScorePanel from './components/ScorePanel';

const Play: React.FC = () => {
  const {
    state: {
      second,
      stage,
      nowPrice,
      nowBidder,
      worths,
      isPlaying,
      awardedList,
    },
    dispatch,
  } = useGameContext();

  const [modal, setModal] = useState(false);
  const handleModalOpen = (state: boolean) => () => {
    setModal(state);
  };

  //game state change
  useEffect(() => {
    dispatch({ type: 'CHANGE_GAME_STATE', state: true });
  }, []);

  //countdown
  useEffect(() => {
    if (isPlaying) {
      const countDown = setInterval(() => {
        if (second === 0) {
          if (stage < worths.length) {
            dispatch({ type: 'AWARDING' });
            dispatch({ type: 'SET_NEXT_STAGE' });
          } else {
            //worths list 끝까지 간 후 게임 종료
            dispatch({ type: 'CHANGE_GAME_STATE', state: false });
          }
        } else {
          dispatch({ type: 'SET_TIME' });
          clearInterval(countDown);
        }
      }, 1000);

      return () => clearInterval(countDown);
    }
  }, [second, isPlaying]);

  //modal control
  useEffect(() => {
    if (isPlaying) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [isPlaying]);

  const handleBidding = () => {
    dispatch({ type: 'BIDDING', bidder: USER_ID });
  };

  return (
    <>
      <div className='container'>
        <div className='left'>
          <div className='second bg-yellow ft-navy'>{second}</div>
          <div className='stage ft-yellow'>
            {isPlaying && <div>stage {stage}</div>}
          </div>
        </div>

        <div className='mid'>
          <div className='card bg-sky'>
            <div className='price ft-navy'>
              <span>현재최고가 </span>
              <span style={{ fontWeight: 800 }}>{nowPrice}만원</span>
            </div>
            <div className='worth ft-navy'>
              {worths.find((worth) => worth.id === stage)?.name}
            </div>
            <div className='bidder ft-navy'>
              <span>예비낙찰자 </span>
              <span style={{ fontWeight: 800 }}>
                {nowBidder === USER_ID && '나'}
                {nowBidder === BOT_ID && '상대방'}
                {nowBidder === null && '없음'}
              </span>
            </div>
          </div>
          <div className='btn-container'>
            <button
              className='bid-btn bg-midsky'
              type='button'
              onClick={handleBidding}
            >
              <div>입찰하기</div>
              <div className='ft-sm ft-sky'>(최고가 +5만원)</div>
            </button>
          </div>
        </div>

        <div className='right'>
          <ScorePanel awardedList={awardedList} />
        </div>
      </div>

      {modal && (
        <GameOverModal open={modal} handleClose={handleModalOpen(false)} />
      )}

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
          flex-direction: column;
          position: relative;
          box-shadow: 10px 10px #8497b0;
        }
        .worth {
          font-size: 2rem;
          font-family: 'Gong';
        }
        .left {
          width: 30%;
          height: 100%;
        }
        .mid {
          width: 40%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .right {
          width: 30%;
          height: 100%;
          display: flex;
          flex-flow: column;
          row-gap: 2rem;
        }
        .stage {
          width: 10rem;
          margin-top: 1rem;
          text-align: center;
          font-weight: 200;
        }
        .btn-container {
          width: 100%;
          margin: 0 auto;
          padding: 1rem 0;
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }
        .bid-btn {
          width: 50%;
          padding: 2rem 0;
          font-size: 2rem;
          font-family: 'Gong';
          color: #fff;
        }
        .ft-sm {
          margin-top: 0.5rem;
          font-weight: 200;
          font-size: 1rem;
        }
        .price {
          position: absolute;
          top: 1rem;
        }
        .bidder {
          position: absolute;
          bottom: 1rem;
        }
      `}</style>
    </>
  );
};

export default Play;
