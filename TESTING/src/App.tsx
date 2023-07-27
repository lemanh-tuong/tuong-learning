import { useState } from "react";
import { FormMutation } from "./packages/Todos/Form/FormMutation";
import { Todo } from "./packages/Todos/models/Todo";
import { Listing } from "./packages/Todos/Listing/Listing";
import { v4 } from "uuid";

function App() {
  /** Listing */
  const [todos, setTodos] = useState<Todo[]>([]);

  /** Create */
  const [isCreateTodo, setIsCreateTodo] = useState(false);
  const renderCreateForm = () => {
    if (isCreateTodo) {
      return (
        <div>
          <FormMutation
            uid="FormCreate"
            variant="Create"
            onSubmit={(values) => {
              setTodos((state) => state.concat({ ...values, id: v4() }));
              setIsCreateTodo(false);
            }}
          />
          <button type="submit" form="FormCreate">
            Submit
          </button>
          <button onClick={() => setIsCreateTodo(false)}>Cancel</button>
          <button type="reset" form="FormCreate">
            Reset
          </button>
        </div>
      );
    }
    return null;
  };

  /** Update */
  const [isUpdateTodo, setIsUpdateTodo] = useState<Todo | null>(null);
  const renderUpdateForm = () => {
    if (isUpdateTodo) {
      return (
        <div>
          <FormMutation
            uid="FormUpdate"
            variant="Update"
            defaultValues={isUpdateTodo}
            onSubmit={(values) => {
              setTodos((state) =>
                state.map((todo) => {
                  if (todo.id === isUpdateTodo.id) {
                    return {
                      ...todo,
                      ...values,
                    };
                  }
                  return todo;
                })
              );
              setIsUpdateTodo(null);
            }}
          />
          <button type="submit" form="FormUpdate">
            Submit
          </button>
          <button onClick={() => setIsUpdateTodo(null)}>Cancel</button>
          <button type="reset" form="FormUpdate">
            Reset
          </button>
        </div>
      );
    }
    return null;
  };

  /** Delete */
  const [isDeleteTodo, setIsDeleteTodo] = useState<Todo | null>(null);

  const renderDeleteForm = () => {
    if (isDeleteTodo) {
      // eslint-disable-next-line no-restricted-globals
      const isDelete = confirm("Your transaction can't undo");
      if (isDelete) {
        setIsDeleteTodo(null);
        setTodos((state) =>
          state.filter((item) => item.id !== isDeleteTodo.id)
        );
      }
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label>
          Search <input />
        </label>
      </div>
      <div>
        <button id="create_todo" onClick={() => setIsCreateTodo(true)}>Create</button>
      </div>
      <Listing
        todos={todos}
        onEdit={setIsUpdateTodo}
        onDelete={setIsDeleteTodo}
      />
      {renderCreateForm()}
      {renderUpdateForm()}
      {renderDeleteForm()}
    </div>
  );
}

export default App;
