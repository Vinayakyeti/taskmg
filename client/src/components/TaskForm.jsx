import { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Please add a task title');
            return;
        }

        await onTaskAdded({ title, description, status });
        
        // Reset form
        setTitle('');
        setDescription('');
        setStatus('pending');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                />
            </div>

            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                    id="status" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
};

export default TaskForm;