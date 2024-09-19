import { FC, useState } from "react";
import { Todo } from "./types";

interface TodoProps {
  todo: Todo;
  removeTodo: (id: number) => void;
  editTodo: (val: string, id: number) => void;
  toggleEditMode: (id: number) => void;
}

const TodoItem: FC<TodoProps> = ({
  todo,
  editTodo,
  removeTodo,
  toggleEditMode,
}) => {
  const [editInput, setEditInput] = useState(todo.title ?? "");
  return (
    <div className="todo">
      {!todo.isEditing ? (
        <>
          <p className="todo-text">{todo.title}</p>
          <div className="todo-actions">
            <button onClick={() => toggleEditMode(todo.id)}>Edit</button>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <input
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="todo-text"
          />
          <div className="todo-actions">
            <button onClick={() => editTodo(editInput, todo.id)}>Save</button>
            <button
              disabled={todo.isEditing}
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
