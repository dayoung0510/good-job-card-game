import React from 'react';
import {
  AwardListType,
  BOT_ID,
  USER_ID,
  defaultWorths,
} from '../contexts/GameContext';

const ScorePanel: React.FC<{ awardedList: AwardListType[] }> = ({
  awardedList,
}) => {
  return (
    <>
      <div className='panel bg-sky'>
        <div className='title ft-gong '>나</div>
        {awardedList?.map(
          (award) =>
            award.bidder === USER_ID && (
              <div className='row'>
                {award.worthName} ({award.price}만원)
              </div>
            )
        )}
      </div>

      <div className='panel bg-gray'>
        <div className='title ft-gong'>상대방</div>
        {awardedList.map(
          (award) =>
            award.bidder === BOT_ID && (
              <div className='row'>
                {award.worthName} ({award.price}만원)
              </div>
            )
        )}
      </div>

      <style jsx>{`
        .row {
          padding: 1rem 0.5rem;
          border-bottom: 1px solid #ececec;
        }
        .panel {
          height: 50%;
          overflow: auto;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 30%);
          border-radius: 4px;
        }
        .title {
          padding: 1rem;
          text-align: center;
          font-weight: 400;
          font-size: 2rem;
        }
      `}</style>
    </>
  );
};

export default ScorePanel;
