import React from 'react';

function TaskList({ tasks }) {
  return (
    <div>
      <h3>Your Tasks</h3>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.TaskId} className="task-item">
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
