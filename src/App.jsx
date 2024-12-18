import { useState, useEffect } from "react";


function App() {

const [faceio, setFaceio] = useState(null);
const [error, setError] = useState(null);


useEffect(() => {
const initializeFaceIO = async () => {
try {
// Create a new instance of FaceIO with your public ID
const faceioInstance = new faceIO("YOUR_PUBLIC_ID");
// Update state with the instance
setFaceio(faceioInstance);
} catch (error) {
// Set error state if initialization fails
setError("Failed to initialize FaceIO: " + error.message);
}
};
initializeFaceIO();
}, []);

// Define function to handle enrollment
const handleEnroll = async () => {
try {
// Call the enroll method of the FaceIO instance with necessary options
const response = await faceio.enroll({
locale: "auto",
payload: {
email: "example@gmail.com",
pin: "12345",
},
});

} catch (error) {
// Set error state if enrollment fails
setError("Enrollment failed: " + error.message);
}
};

// Define function to handle authentication
const handleAuthenticate = async () => {
try {
// Call the authenticate method of the FaceIO instance with necessary options
const response = await faceio.authenticate({
locale: "auto",
});

} catch (error) {
// Set error state if authentication fails
setError("Authentication failed: " + error.message);
}
};


return (
<section className="flex flex-col justify-center items-center gap-4 h-screen">
  <h1 className="font-bold text-xl">Facial Authentication with FaceIO</h1>
  <button className="bg-blue-800 px-3 py-1 rounded-lg" onClick={handleEnroll}>Enroll</button>
  <button className="bg-blue-800 px-3 py-1 rounded-lg" onClick={handleAuthenticate}>Authenticate</button>
  {error && <div className="error">{error}</div>}
</section>
);
}

export default App;