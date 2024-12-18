import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [hours, setHours] = useState("");
  const [workLog, setWorkLog] = useState([]);

  const handleLogHours = () => {
    const newEntry = { date: new Date().toLocaleString(), hours };
    setWorkLog([...workLog, newEntry]);
    setHours("");
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <input
        type="number"
        placeholder="Enter hours worked"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <button onClick={handleLogHours}>Log Hours</button>
      <button onClick={logout}>Logout</button>
      <h3>Work Hours Log</h3>
      <ul>
        {workLog.map((entry, index) => (
          <li key={index}>
            {entry.date}: {entry.hours} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;