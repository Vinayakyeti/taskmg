import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <div className="no-tasks">
                    <p>No tasks found. Start by adding one!</p>
                </div>
            ) : (
                tasks.map((task) => (
                    <TaskItem 
                        key={task._id} 
                        task={task} 
                        onUpdate={onUpdate} 
                        onDelete={onDelete} 
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;