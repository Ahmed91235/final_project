import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { fetchTasks, createTask } from '../api';
import CreateTaskForm from '../components/Tasks/CreateTaskForm';
import TaskList from '../components/Tasks/TaskList';
import { useNavigate } from 'react-router-dom';

function DashboardPage({ user, onSignOut }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  async function loadTasks() {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  }

  async function handleCreateTask() {
    if (!taskInput.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    try {
      await createTask({ title: taskInput.title, description: taskInput.description });
      toast.success("Task created successfully!");
      loadTasks();
      setTaskInput({ title: '', description: '' });
    } catch (error) {
      toast.error("Error creating task");
    }
  }

  async function handleSignOut() {
    try {
      await Auth.signOut();
      onSignOut();
      navigate('/signin');
    } catch (error) {
      toast.error("Error signing out");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Welcome, {user?.username}!</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <CreateTaskForm taskInput={taskInput} setTaskInput={setTaskInput} createTask={handleCreateTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default DashboardPage;
