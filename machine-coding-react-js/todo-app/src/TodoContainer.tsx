import { FC } from "react";
import { Todo } from "./types";
import TodoItem from "./Todo";

interface TodoProps {
  todos: Todo[];
  removeTodo: (id: number) => void;
  editTodo: (val: string, id: number) => void;
  toggleEditMode: (id: number) => void;
}

const TodoContainer: FC<TodoProps> = ({
  todos,
  removeTodo,
  toggleEditMode,
  editTodo,
}) => {
  return (
    <div className="todos">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleEditMode={toggleEditMode}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoContainer;
