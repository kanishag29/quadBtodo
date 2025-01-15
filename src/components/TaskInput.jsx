import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reminder, setReminder] = useState(null);
  const [isOutdoor, setIsOutdoor] = useState(false);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!task) return; 
    const newTask = {
      id: Date.now(),
      task,
      priority,
      completed: false,
      isOutdoor ,
      reminder: reminder ? reminder.toISOString() : null, // Save reminder as ISO string
      isImportant: false, // Default importance
    };
    dispatch(addTask(newTask));
    setTask("");
    setReminder(null); // Clear reminder input after adding

  };

  return (
    <div className="task-inputs">
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <label>
        Outdoor Activity
        <input className="checkstyle"
          type="checkbox" 
          checked={isOutdoor} 
          onChange={() => setIsOutdoor(!isOutdoor)} 
        />
      </label>
      {/* Use ReactDatePicker for the reminder input */}
      <DatePicker
        selected={reminder}
        onChange={(date) => setReminder(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Set reminder"
        className="date-picker"
        // You can control the popup size through these props:
        popperPlacement="bottom-start"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: "0,10px",
          },
        }}
      />
      <button onClick={handleAddTask}><span>✚</span> Add Task</button>
    </div>
  );
};

export default TaskInput;