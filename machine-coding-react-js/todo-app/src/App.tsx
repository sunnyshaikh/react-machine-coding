import { useState } from "react";
import TodoContainer from "./TodoContainer";
import { Todo } from "./types";

const App = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!todoInput) return;
    const todo = {
      id: Date.now(),
      title: todoInput,
      isComplete: false,
      isEditing: false,
    };
    setTodos((prev) => [todo, ...prev]);
    setTodoInput("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleEditMode = (id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const editTodo = (val: string, id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: val, isEditing: false } : item
      )
    );
  };

  return (
    <main className="app">
      <div className="todo-container">
        <div className="input">
          <input
            type="text"
            placeholder="Add todo..."
            className="input-box"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add Todo
          </button>
        </div>
        <TodoContainer
          todos={todos}
          removeTodo={removeTodo}
          editTodo={editTodo}
          toggleEditMode={toggleEditMode}
        />
      </div>
    </main>
  );
};

export default App;
