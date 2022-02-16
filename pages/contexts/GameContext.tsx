import React, { createContext, useContext, useReducer } from "react";

const INITIAL_TIME = 5;

type StateType = {
  isPlaying: boolean;
  stage: number;
  second: number;
  worths: { id: number; name: string }[];
  nowPrice: number;
  bidder: number | null;
  botBettingArr: number[];
};

type ActionType =
  | { type: "SET_IS_PLAYING" }
  | { type: "SET_NEXT_STAGE" }
  | { type: "SET_TIME" };

type ContextProps = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

const defaultState: StateType = {
  isPlaying: true,
  stage: 0,
  second: INITIAL_TIME,
  worths: [
    { id: 0, name: "스트레스 관리" },
    { id: 1, name: "빠른 피드백" },
    { id: 2, name: "자율 출퇴근" },
    { id: 3, name: "직무 적합도" },
    { id: 4, name: "전문가와의 교류" },
    { id: 5, name: "자유로운 휴가" },
    { id: 6, name: "편한 분위기" },
    { id: 7, name: "높은 소득" },
    { id: 8, name: "마음이 맞는 동료" },
    { id: 9, name: "타인을 돕는 기쁨" },
  ],
  nowPrice: 0,
  bidder: null,
  botBettingArr: [10, 20, 5, 15, 0, 10, 30, 0, 5, 5],
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_IS_PLAYING": {
      return { ...state, isPlaying: false };
    }
    case "SET_NEXT_STAGE": {
      return {
        ...state,
        stage: state.stage + 1,
        second: INITIAL_TIME,
        bidder: null,
        nowPrice: 0,
      };
    }
    case "SET_TIME": {
      return { ...state, second: state.second - 1 };
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
