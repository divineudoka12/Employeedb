import React, { useRef, useEffect } from "react";

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startVideo();
  }, []);

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    onCapture(image);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={handleCapture}>Capture Image</button>
    </div>
  );
};

export default WebcamCapture;