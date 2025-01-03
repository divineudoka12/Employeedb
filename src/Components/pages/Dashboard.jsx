import React, { useState, useEffect } from "react";
import { useUser, SignOutButton, UserButton } from "@clerk/clerk-react";

function Dashboard() {
  const { user } = useUser();
  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [totalHours, setTotalHours] = useState(() => {
    const savedHours = localStorage.getItem("totalHours");
    return savedHours ? parseFloat(savedHours) : 0;
  });

  useEffect(() => {
    let timer;
    if (isWorking) {
      timer = setInterval(() => {
        const currentTime = Date.now();
        const secondsElapsed = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(secondsElapsed);
      }, 1000); // Update every second
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Clean up on unmount
  }, [isWorking, startTime]);

  const handleStartWork = () => {
    setIsWorking(true);
    setStartTime(Date.now()); // Record the current time
    setElapsedTime(0); // Reset elapsed time
  };

  const handleStopWork = () => {
    if (isWorking && startTime) {
      const endTime = Date.now();
      const hoursWorked = (endTime - startTime) / (1000 * 60 * 60); // Convert ms to hours
      const updatedTotalHours = totalHours + hoursWorked;

      setTotalHours(updatedTotalHours);
      localStorage.setItem("totalHours", updatedTotalHours.toFixed(2)); // Save to localStorage
    }
    setIsWorking(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div><UserButton /></div>
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
        <p className="mb-4">
          Total Hours Worked: <span className="font-bold">{totalHours.toFixed(2)} hours</span>
        </p>

        {isWorking ? (
          <p className="mb-4">Time Worked: <span className="font-bold">{formatTime(elapsedTime)}</span></p>
        ) : (
          <p className="mb-4">You are not currently working.</p>
        )}

        {isWorking ? (
          <button
            onClick={handleStopWork}
            className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Stop Working
          </button>
        ) : (
          <button
            onClick={handleStartWork}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Start Working
          </button>
        )}
        <SignOutButton>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mt-4">
              Sign Out
            </button>
          </SignOutButton>
      </div>
    </div>

  );
}

export default Dashboard;