import { ITask } from "../services/tasks.service";

export interface IAppState {
    tasks: ITask[];
    popupToggle: boolean;
    inputText: string;
    action: string;
    updateId: string;
  }
  
  interface IStateAction {
    type: string;
    payload?: any;
  }
  
  
  export const actionTypes = {
    SET_TASKS: "SET_TASKS",
    SET_POPUP_TOGGLE: "SET_POPUP_TOGGLE",
    SET_INPUT_TEXT: "SET_INPUT_TEXT",
    SET_ACTION: "SET_ACTION",
    SET_UPDATE_ID: "SET_UPDATE_ID",
  };
  
  export const reducer = (state: IAppState, action: IStateAction): IAppState => {
    switch (action.type) {
      case actionTypes.SET_TASKS:
        return { ...state, tasks: action.payload };
      case actionTypes.SET_POPUP_TOGGLE:
        return { ...state, popupToggle: action.payload };
      case actionTypes.SET_INPUT_TEXT:
        return { ...state, inputText: action.payload };
      case actionTypes.SET_ACTION:
        return { ...state, action: action.payload };
      case actionTypes.SET_UPDATE_ID:
        return { ...state, updateId: action.payload };
      default:
        return state;
    }
  }