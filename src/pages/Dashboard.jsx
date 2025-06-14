// ✅ Toast rendering FIXED at the bottom 👇

import React, { useState, useEffect } from 'react';
import TaskDetailsModal from '../components/TaskDetailsModal';
import AIChatBot from '../components/AIChatBot';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../styles/Dashboard.css';
import '../styles/AIChatBot.css'; 

// ✅ Toast component
const Toast = ({ message }) => (
  <div className="toast-container">
    <div className="toast-message">{message}</div>
  </div>
);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const [reminderText, setReminderText] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [notifiedTasks, setNotifiedTasks] = useState([]);

  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
      checkDueSoonTasks(taskList);
    });

    return () => unsubscribe();
  }, [user]);

  const checkDueSoonTasks = (taskList) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const format = (date) => date.toISOString().split('T')[0];

    const dueSoon = taskList.filter(task =>
      task.dueDate === format(today) || task.dueDate === format(tomorrow)
    );

    if (dueSoon.length > 0) {
      setReminderText(`⏰ You have ${dueSoon.length} task(s) due soon!`);
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 4000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      tasks.forEach((task) => {
        if (!task.dueDate) return;

        const dueTime = new Date(task.dueDate + "T23:59:59").getTime();
        const diff = dueTime - now;

        if (diff > 0 && diff <= 5 * 60 * 1000 && !notifiedTasks.includes(task.id)) {
          showNotification(task.title);
          setNotifiedTasks((prev) => [...prev, task.id]);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks, notifiedTasks]);

  const showNotification = (taskTitle) => {
    if (Notification.permission === "granted") {
      new Notification("⏰ Task Reminder", {
        body: `Your task "${taskTitle}" is due soon!`,
        icon: "/reminder-icon.png",
      });
    }
  };

  const handleAddOrUpdateTask = async () => {
    if (title.trim() === '') return;

    if (isEditing && editId) {
      await updateDoc(doc(db, 'tasks', editId), {
        title,
        description,
        dueDate,
      });
      setToastMsg('✅ Task updated!');
    } else {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        dueDate,
        completed: false,
        createdAt: new Date(),
        userId: user.uid,
      });
      setToastMsg('🎉 Task added!');
    }

    setTitle('');
    setDescription('');
    setDueDate('');
    setIsEditing(false);
    setEditId(null);

    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => setSelectedTask(null);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'tasks', selectedTask.id));
    setSelectedTask(null);
    setToastMsg('🗑️ Task deleted!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleToggleComplete = async () => {
    await updateDoc(doc(db, 'tasks', selectedTask.id), {
      completed: !selectedTask.completed,
    });
    setSelectedTask(null);
    setToastMsg('✅ Task status updated!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleEdit = () => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(selectedTask.dueDate);
      setIsEditing(true);
      setEditId(selectedTask.id);
      setSelectedTask(null);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h3>👋 Welcome, {user?.displayName || user?.email}</h3>
        </div>
        <div className="dashboard-header-right">
          <Link to="/settings" className="settings-fixed-button">⚙️</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="task-entry-container">
        <div className="task-card">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={handleAddOrUpdateTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
{/* ✅ Toast stack container with multiple messages */}
<div className="toast-stack-container">
  {showReminder && <Toast message={reminderText} />}
  {toastMsg && <Toast message={toastMsg} />}
</div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card" onClick={() => handleTaskClick(task)}>
            <h4>{task.title}</h4>
            <p>{task.completed ? "✅ Completed" : "🕒 In Progress"}</p>
          </div>
        ))}
      </div>

      <TaskDetailsModal
        task={selectedTask}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />

      {/* ✅ Toasts are wrapped together and positioned cleanly */}
      <div style={{ position: 'fixed', bottom: '80px', right: '30px', zIndex: 9999 }}>
        {showReminder && <Toast message={reminderText} />}
        {toastMsg && <Toast message={toastMsg} />}
      </div>

      <div className="ai-assistant-container">
        <AIChatBot />
      </div>
    </div>
  );
};

export default Dashboard;
