import React, { useEffect, useState } from 'react';
import Taskform from './components/Taskform';
import Tasklist from './components/Tasklist';
import Progresstracker from './components/Progresstracker';
import './style.css';


export default function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Load saved tasks once when app starts
  // useEffect(() => {
  //   const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  //   setTasks(saved);
  // }, []);

  // ✅ Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Add new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // ✅ Update existing task
  const updateTask = (updatedTask, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  // ✅ Delete a specific task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // ✅ Clear all tasks
  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  return (
    <div className='App'>
      <header>
      <h1 className='title'>Task Buddy</h1>
      <p className='tagline'>Your friendly Task Manager</p>
      </header>
      <Taskform addTask={addTask} />

      {/* ✅ Pass updateTask and deleteTask as props */}
      <Tasklist tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />

      <Progresstracker tasks={tasks} />

      {tasks.length > 0 && <button onClick={clearTasks} className='clear-btn'>Clear All Tasks</button>}
      {/* <button onClick={clearAll}>Clear All Tasks</button> */}
    </div>
  );
}
