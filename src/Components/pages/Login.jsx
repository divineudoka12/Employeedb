import React, { useState, useContext } from "react";
// import WebcamCapture from "../WebcamCapture";
import FaceRecognition from "../FaceAuth";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const handleFaceDetected = (isDetected) => {
    setVerified(isDetected);
  };

  const handleLogin = () => {
    if (verified) {
      login({ name: "Employee" });
      navigate("/dashboard");
    } else {
      alert("Face not recognized. Please try again.");
    }
  };

  return (
    <div >
      <h2>Login with Facial Recognition</h2>
      <FaceRecognition onFaceDetected={handleFaceDetected} />
      <button onClick={handleLogin} disabled={!verified}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;