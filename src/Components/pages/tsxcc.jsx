import React, { useEffect, useState } from "react";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

const clerkFrontendApi = "your-clerk-frontend-api-key"; // Replace with your Clerk Frontend API key

function EmployeeDashboard() {
  const { user } = useUser();
  const [isWorking, setIsWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalHours, setTotalHours] = useState(() => {
    const savedHours = localStorage.getItem("totalHours");
    return savedHours ? parseFloat(savedHours) : 0;
  });

  const handleStartWork = () => {
    setIsWorking(true);
    setStartTime(Date.now());
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
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
        <p className="mb-4">
          Total Hours Worked: <span className="font-bold">{totalHours.toFixed(2)} hours</span>
        </p>

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
      </div>
    </div>
  );
}

export default App;
