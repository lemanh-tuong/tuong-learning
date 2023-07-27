import { Todo } from "../types/models/Todo";
import createState from "../libs/ScratchRedux/createState";

export interface TodosState {
  isLoading: boolean;
  data: Todo[];
  message: string;
}

const initialState: TodosState = {
  isLoading: false,
  data: [],
  message: ""
};

const { getState, setState, subscribe } = createState(initialState, {
  stateName: "todosState",
  useLocalStorage: true
});

export const todosState = {
  getState,
  setState,
  subscribe,
};

