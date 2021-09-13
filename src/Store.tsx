import React, { useContext } from "react";
import { AppState } from "./types";

const initialState: AppState = {
  player: "A",
  reset: false,
  markedByA: [],
  markedByB: [],
  probability: null,
};

interface AppContextType extends AppState {
  dispatch: React.Dispatch<Action>;
}

const AppContext = React.createContext<AppContextType>(
  initialState as AppContextType
);

export function useAppContext() {
  return useContext(AppContext);
}

type Action = {
  type: "CHANGE_PLAYER" | "RESET_BOARD" | "MARK" | "SET_PROBABILITY";
  payload?: any;
};

const reducer = (state: AppState, action: Action): AppState => {
  if (action.type === "MARK") {
    if (action.payload.player === "A") {
      return {
        ...state,
        reset: false,
        markedByA: [...state.markedByA, action.payload.index],
      };
    }
    if (action.payload.player === "B") {
      return {
        ...state,
        reset: false,
        markedByB: [...state.markedByB, action.payload.index],
      };
    }
  }
  if (action.type === "CHANGE_PLAYER") {
    return { ...state, player: state.player === "A" ? "B" : "A" };
  }
  if (action.type === "RESET_BOARD") {
    return {
      ...state,
      player: "A",
      markedByA: [],
      markedByB: [],
      reset: true,
      probability: null,
    };
  }
  if (action.type === "SET_PROBABILITY") {
    return { ...state, probability: action.payload };
  }
  return state;
};

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
