import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ToDoProps } from "./Todo";

export interface NewToDoProps {
  createTodo?: ({ task, id }: ToDoProps) => void;
}

function NewTodoForm({ createTodo }: NewToDoProps) {
  const [task, setTask] = useState("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTask(evt.target.value);
  };

  const gatherInput = createTodo ? (evt: React.FormEvent) => {
    evt.preventDefault();
    createTodo({ task, id: uuid() });
    setTask("");
  }: undefined;

  return (
    <div>
      <form onSubmit={gatherInput}>
        <label htmlFor="task">Task:</label>
        <input
          id="task"
          name="task"
          type="text"
          onChange={handleChange}
          value={task}
        />
        <button>Add a todo!</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
