import axios from "axios";
import React from "react";
import { Link } from "../libs/ReactRouter/Link";
import { Todo } from "../types/models/Todo";
import { GetServerSideProps } from "../types/GetServerSideProps";

export const getTodos = async () => {
  return axios
    .get<Todo[]>("api/todos", { baseURL: "http://localhost:3000" })
    .then((response) => response.data);
};

const Todos = ({ todos }: Awaited<ReturnType<typeof getServerSideProps>>) => {
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

export default Todos;

export const getServerSideProps: GetServerSideProps<{
  todos: Todo[];
}> = async () => {
  const todos = await getTodos();
  return {
    todos,
  };
};
