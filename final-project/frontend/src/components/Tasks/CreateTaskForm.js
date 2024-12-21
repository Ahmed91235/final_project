import React from 'react';

function CreateTaskForm({ taskInput, setTaskInput, createTask }) {
  return (
    <div className="form-group">
      <label>Task Title</label>
      <input
        placeholder="Task title"
        value={taskInput.title}
        onChange={e => setTaskInput({ ...taskInput, title: e.target.value })}
      />

      <label>Task Description</label>
      <input
        placeholder="Task description"
        value={taskInput.description}
        onChange={e => setTaskInput({ ...taskInput, description: e.target.value })}
      />

      <button onClick={createTask}>Create Task</button>
    </div>
  );
}

export default CreateTaskForm;
