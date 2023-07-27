import { Todo } from "../models/Todo";

interface Props {
  todos: Todo[];
  onEdit?: (record: Todo) => void;
  onDelete?: (record: Todo) => void;
}

export const Listing = ({ todos, onEdit, onDelete }: Props) => {
  return (
    <table>
      <tr>
        <td>#</td>
        <td>Title</td>
        <td>Description</td>
        <td></td>
      </tr>
      <tbody>
        {todos.map((todo, index) => {
          return (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => onEdit?.(todo)}>Edit</button>
                <button onClick={() => onDelete?.(todo)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
