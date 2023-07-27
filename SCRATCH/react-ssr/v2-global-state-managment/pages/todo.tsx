import axios from "axios";
import React from "react";
import { Link } from "../libs/ScratchRouter/Link";
import { Todo } from "../types/models/Todo";
import { GetServerSideProps } from "../types/GetServerSideProps";

const getTodo = async (id: string) => {
  return axios
    .get<Todo>(`api/todo/${id}`, { baseURL: "http://localhost:3000" })
    .then((response) => response.data);
};

const TodoDetail = ({
  todo,
}: Awaited<ReturnType<typeof getServerSideProps>>) => {
  return (
    <div>
      <Link to="/todos">Go Back</Link>
      <h1>Todo detail</h1>
      <div>{JSON.stringify(todo, undefined, 2)}</div>
    </div>
  );
};

export default TodoDetail;

export const getServerSideProps: GetServerSideProps<{ todo?: Todo }> = async (
  request,
  response
) => {
  if (typeof request.query.id === "string") {
    const todo = await getTodo(request.query.id);
    return {
      todo,
    };
  } else {
    return response.redirect("/todos") as any;
  }
};
