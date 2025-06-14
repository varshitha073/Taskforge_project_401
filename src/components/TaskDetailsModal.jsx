import React from 'react';
import '../styles/TaskDetailsModal.css';

const TaskDetailsModal = ({ task, onClose, onEdit, onDelete, onToggleComplete }) => {
  if (!task) return null;

  return (
    <div className="td-modal-overlay">
      <div className="td-modal-content">
        <h2 className="td-title">{task.title}</h2>
        
        <p><strong>Description:</strong> {task.description || "No description"}</p>
        <p><strong>Due Date:</strong> {task.dueDate || "No due date"}</p>
        <p>
          <strong>Status:</strong>
          <span className={task.completed ? 'td-complete' : 'td-progress'}>
            {task.completed ? '✔️ Completed' : '⏳ In Progress'}
          </span>
        </p>

        <div className="td-buttons">
          <button className="td-btn edit" onClick={() => { onEdit(); onClose(); }}>
            ✏️ Edit
          </button>
          <button className="td-btn complete" onClick={onToggleComplete}>
            {task.completed ? '↩️ Mark In-Progress' : '✔️ Mark Complete'}
          </button>
          <button className="td-btn delete" onClick={onDelete}>
            🗑️ Delete
          </button>
          <button className="td-btn close" onClick={onClose}>
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
