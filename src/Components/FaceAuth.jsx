import React, { useEffect, useRef } from "react";

const FaceRecognition = ({ onFaceDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadFaceDetection = async () => {
      const faceCascade = new cv.CascadeClassifier();
      const utils = new Utils("errorMessage");
      utils.createFileFromUrl(
        "haarcascade_frontalface_default.xml",
        "https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml",
        () => {
          faceCascade.load("haarcascade_frontalface_default.xml");
        }
      );

      const detectFaces = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const src = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
        const gray = new cv.Mat();
        const faces = new cv.RectVector();

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        src.data.set(imageData.data);

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        faceCascade.detectMultiScale(gray, faces);

        if (faces.size() > 0) {
          onFaceDetected(true);
        } else {
          onFaceDetected(false);
        }

        requestAnimationFrame(detectFaces);
      };

      detectFaces();
    };

    loadFaceDetection();
  }, [onFaceDetected]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" />
    </div>
  );
};

export default FaceRecognition;