import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask, toggleImportantTask } from "../redux/actions";
import profileImage from "../images/profile.png";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TaskInput from './TaskInput';
import Login from './Login';
import TaskWeather from './Weather';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showImportant, setShowImportant] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [city, setCity] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleImportant = (id) => {
    dispatch(toggleImportantTask(id));
  };

  const filteredTasks = showCompleted
    ? tasks.filter((task) => task.completed)
    : showImportant
      ? tasks.filter((task) => task.isImportant)
      : tasks;

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Task Status",
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#3E5879", "#D8C4B6"],
        borderColor: ["#388e3c", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} tasks`;
          },
        },
      },
    },
  };

  useEffect(() => {
    if (motivationalQuote === '') {
      fetchMotivationalQuote();
    }
  }, [motivationalQuote]);

  const fetchMotivationalQuote = async () => {
    try {
      const quotes = [
        
        "One step at a time.",
        "You are capable of amazing things!",
        "Don't stop when you're tired, stop when you're done!"
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setMotivationalQuote(randomQuote);
    } catch (error) {
      console.error('Error fetching motivational quote', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.style.backgroundColor = "#333";
      document.body.style.color = "#fff";
    } else {
      document.body.classList.remove("dark-mode");
      document.body.style.backgroundColor = "#F95454";
      document.body.style.color = "#000";
    }
  }, [isDarkMode]);

  return (
    <div className="incontain" style={styles.container}>
      {/* Flex Column 1: Profile & Categories */}
      <div style={styles.column1}>
        <img
          src={profileImage} // Use the imported profile image
          alt="Profile"
          style={styles.profilePic}
        />
        <h2 style={styles.username}>Username</h2>
        <div style={styles.taskCategories}>
          <ul style={styles.taskCategoriesUl}>
            <li
              onClick={() => {
                setShowCompleted(false);
                setShowImportant(false);
              }}
              style={styles.categoryItem}
            >
            📌 All Tasks
            </li>

            <li
              onClick={() => setShowImportant(!showImportant)}
              style={styles.categoryItem}
            >
              {showImportant ? "Show All Tasks" : "🌟 Show Important"}
            </li>
            <li
              onClick={() => setShowCompleted(!showCompleted)}
              style={styles.categoryItem}
            >
              {showCompleted ? "Show All Tasks" : "✔️ Show Completed"}
            </li>
            <div style={styles.chartSection}>
              <Pie data={pieData} options={pieOptions} height={200} />
            </div>
          </ul>
        </div>
      </div>

      {/* Flex Column 2, 3, 4: Task List */}
      <div style={styles.column2_3_4}>
        <div style={styles.buttonSection}>
          <div className="logoutbtn">
            <center><h2>WELCOME logged in</h2></center>
            <Login />
          </div>
          <TaskInput />
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? "🔆" : "🌙 "}
          </button>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span>{task.task} - {task.priority}</span>
              {task.reminder && (
                <div style={{ fontSize: "0.9rem", color: "gray" }}>
                  Reminder: {formatDate(task.reminder)}
                </div>
              )}
              <span
                style={{
                  cursor: "pointer",
                  color: task.isImportant ? "gold" : "gray",
                  fontSize: "1.5rem",
                }}
                onClick={() => handleToggleImportant(task.id)}
              >
                {task.isImportant ? "🌟" : "☆"}
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
              {task.isOutdoor && (
                <>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <TaskWeather isOutdoor={task.isOutdoor} city={city} />
                </>
              )}
              {!task.isOutdoor && (
                <div style={{ fontStyle: 'italic', color: 'gray' }}>
                  <p>{motivationalQuote}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



const styles = {

  container: {
    display: "flex",
    width: "100%",
    padding: "20px",
   
  },
  column1: {
    flex: 1,
    padding: "20px",
    textAlign: "center", // Center the content in column1
    borderRight: "2px solid #ccc",
  },
  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginTop: "0px",
  },
  username: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  taskCategories: {
    marginTop: "20px",
  },
  taskCategoriesUl: {
    listStyleType: "none",
    padding: 0,
  },
  categoryItem: {
    cursor: "pointer",
    padding: "10px 0",
  },
  column2_3_4: {
    flex: 3,
    padding: "20px",
  },
  buttonSection: {
    marginBottom: "20px",
  },
  chartSection: {
    marginTop: "30px",
    
  },
};

export default TaskList;






