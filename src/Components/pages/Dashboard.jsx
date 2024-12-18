import React, { useState, useEffect } from "react";
import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react";

function Dashboard() {
  const { user } = useUser(); // Get user details from Clerk
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [loginTime, setLoginTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Start the timer when the component mounts (user logs in)
  useEffect(() => {
    const startTime = new Date();
    setLoginTime(startTime);

    const timerInterval = setInterval(() => {
      setElapsedTime(Math.floor((new Date() - startTime) / 1000)); // Calculate elapsed time in seconds
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup interval when the component unmounts (user logs out)
  }, []);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
          <UserButton />
        </div>
        <h2 className="text-lg font-semibold mb-2">Your To-Do List:</h2>
        <ul className="list-disc pl-6 mb-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{task}</span>
              <button
                onClick={() => handleRemoveTask(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="New task..."
            className="border p-2 flex-grow rounded-lg"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Logged in for: <span className="font-bold">{formatTime(elapsedTime)}</span>
          </p>
          <SignOutButton>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mt-4">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;