import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "../libs/ScratchRouter/Link";
import { Todo } from "../types/models/Todo";
import { GetServerSideProps } from "../types/GetServerSideProps";
import withState from "../libs/ScratchRedux/withState";
import { todosState } from "../store/todosState";

export const getTodos = async () => {
  return axios
    .get<Todo[]>("api/todos", { baseURL: "http://localhost:3000" })
    .then((response) => response.data);
};



export const getServerSideProps = async () => {
  state.todos.setState((state) => ({ ...state, isLoading: true }));
  try {
    const todos = await getTodos();
    state.todos.setState((state) => ({ ...state, data: todos }));
  } finally {
    state.todos.setState((state) => ({ ...state, isLoading: false }));
  }
};

const state = { todos: todosState };
const Todos = () => {
  const todos = state.todos.getState().data;

  useEffect(() => {
    getServerSideProps();
  }, [])

  return (
    <div>
      <h1>Todos list</h1>
      <ul>
        {todos.map(({ _id, title, iconUrl }) => (
          <li key={_id}>
            <Link to={`/todo/${_id}`}>
              <img src={iconUrl} width={20} />
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withState(state)(Todos);

