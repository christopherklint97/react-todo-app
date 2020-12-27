import React, { useState } from "react";

export interface ToDoProps {
  task: string,
  id: string,
  remove?: (id: string) => void,
  update?: (id: string, editTask: string) => void
}

function Todo({ task = "default todo", id = "1", remove, update }: ToDoProps) {
  const [editTask, setEditTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(edit => !edit);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask(evt.target.value);
  };

  const handleDelete = remove ? () => remove(id): undefined;

  const handleUpdate = update ? (evt: React.FormEvent) => {
    evt.preventDefault();
    update(id, editTask);
    setIsEditing(false);
  }: undefined;

  // default todo view
  let jsx = (
    <div>
      <li>{task}</li>
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={handleDelete}>X</button>
    </div>
  );

  // todo view when editing
  if (isEditing) {
    jsx = (
      <div>
        <form onSubmit={handleUpdate}>
          <input type="text" value={editTask} onChange={handleChange} />
          <button>Update!</button>
        </form>
      </div>
    );
  }

  return jsx;
}

export default Todo;
