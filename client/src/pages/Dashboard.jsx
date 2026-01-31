import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskService';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [user, navigate]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to fetch tasks');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to create task');
      }
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      setError(null);
      const updatedTask = await updateTask(id, updatedData);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to update task');
      }
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      setError(null);
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to delete task');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          </div>
        </div>
      </header>
      
      <main>
        {error && <div className="error-message">{error}</div>}
        
        <section className="form-section">
          <h2>Add New Task</h2>
          <TaskForm onTaskAdded={handleAddTask} />
        </section>

        <section className="list-section">
          <h2>Your Tasks</h2>
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList 
              tasks={tasks} 
              onUpdate={handleUpdateTask} 
              onDelete={handleDeleteTask} 
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;