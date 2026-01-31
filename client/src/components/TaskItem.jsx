import { FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    
    const handleStatusChange = (e) => {
        onUpdate(task._id, { status: e.target.value });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#d4edda'; // green-ish
            case 'in-progress': return '#fff3cd'; // yellow-ish
            default: return '#f8f9fa'; // gray-ish
        }
    };

    return (
        <div className="task-item" style={{ borderLeft: `5px solid ${getStatusColor(task.status)}` }}>
            <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                
                <div className="task-meta">
                    <span className="status-label">Status: </span>
                    <select 
                        value={task.status} 
                        onChange={handleStatusChange}
                        className={`status-select ${task.status}`}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <button 
                onClick={() => onDelete(task._id)} 
                className="btn btn-icon btn-delete"
                aria-label="Delete Task"
            >
                <FaTrash />
            </button>
        </div>
    );
};

export default TaskItem;