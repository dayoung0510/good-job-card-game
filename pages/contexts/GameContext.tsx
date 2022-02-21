import React, { createContext, useContext, useReducer } from 'react';

const INITIAL_TIME = 1;
export const BOT_ID = 0;
export const USER_ID = 1;
const INITIAL_MONEY = 50;
export const defaultWorths = [
  { id: 1, name: '빠른 피드백' },
  { id: 2, name: '자율 출퇴근' },
  { id: 3, name: '직무 적합도' },
  { id: 4, name: '전문가와의 교류' },
  { id: 5, name: '자유로운 휴가' },
  { id: 6, name: '편한 분위기' },
  { id: 7, name: '높은 소득' },
  { id: 8, name: '마음이 맞는 동료' },
  { id: 9, name: '타인을 돕는 기쁨' },
  { id: 10, name: '스트레스 관리' },
];

export type AwardListType = {
  worthId: number | null;
  worthName: string | null;
  bidder: number | null;
  price: number | null;
};

type StateType = {
  isPlaying: boolean;
  stage: number;
  second: number;
  worths: { id: number; name: string }[];
  nowPrice: number;
  nowBidder: number | null;
  botBettingArr: number[];
  awardedList: AwardListType[];
};

type ActionType =
  | { type: 'SET_IS_PLAYING' }
  | { type: 'SET_NEXT_STAGE' }
  | { type: 'SET_TIME' }
  | { type: 'BIDDING'; bidder: number }
  | { type: 'INITIALIZE' }
  | { type: 'CHANGE_GAME_STATE'; state: boolean }
  | { type: 'AWARDING' };

type ContextProps = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

const defaultState: StateType = {
  isPlaying: false,
  stage: 1,
  second: INITIAL_TIME,
  worths: defaultWorths,
  nowPrice: 0,
  nowBidder: null,
  botBettingArr: [10, 20, 5, 15, 0, 10, 30, 0, 5, 5],
  awardedList: [],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    //다음 스테이지로 넘어가기
    case 'SET_NEXT_STAGE': {
      return {
        ...state,
        stage: state.stage + 1,
        second: INITIAL_TIME,
        nowBidder: null,
        nowPrice: 0,
      };
    }

    case 'AWARDING': {
      const addObj = {
        worthId: state.worths[state.stage - 1].id,
        worthName: state.worths[state.stage - 1].name,
        bidder: state.nowBidder,
        price: state.nowPrice,
      };
      return {
        ...state,
        awardedList: state.awardedList.concat(addObj),
      };
    }

    //카운트다운
    case 'SET_TIME': {
      return { ...state, second: state.second - 1 };
    }

    //입찰하기 버튼 눌렀을 때 동작
    case 'BIDDING': {
      const bidder = action.bidder;
      return {
        ...state,
        second: INITIAL_TIME,
        nowBidder: bidder,
        nowPrice: state.nowPrice + 5,
      };
    }

    //새 게임 시작
    case 'INITIALIZE': {
      //카드섞기
      //배팅금액섞기
      return {
        isPlaying: false,
        stage: 1,
        second: INITIAL_TIME,
        worths: defaultWorths,
        nowPrice: 0,
        nowBidder: null,
        botBettingArr: [10, 20, 5, 15, 0, 10, 30, 0, 5, 5],
        awardedList: [],
      };
    }

    //게임상태 true or false
    case 'CHANGE_GAME_STATE': {
      const gameState = action.state;
      return { ...state, isPlaying: gameState };
    }

    default: {
      return state;
    }
  }
};

const Context = createContext<ContextProps>({
  state: defaultState,
  dispatch: () => {},
});

export const useGameContext = () => useContext(Context);

const GameContext: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default GameContext;
