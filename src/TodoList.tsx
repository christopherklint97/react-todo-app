import React, { useState } from "react";
import Todo, { ToDoProps } from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const [todos, setTodos] = useState<ToDoProps[]>([]);

  // add a new todo
  const create = (newTodo: ToDoProps) => {
    setTodos(todos => [...todos, newTodo]);
  };

  // update a todo with updatedTask
  const update = (id: string, updatedTask: string) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, task: updatedTask } : todo
      )
    );
  };

  // delete a todo by id
  const remove = (id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const todoComponents = todos.map(todo => (
    <Todo
      remove={remove}
      key={todo.id}
      id={todo.id}
      task={todo.task}
      update={update}
    />
  ));

  return (
    <div>
      <NewTodoForm createTodo={create} />
      <ul>{todoComponents}</ul>
    </div>
  );
}

export default TodoList;
