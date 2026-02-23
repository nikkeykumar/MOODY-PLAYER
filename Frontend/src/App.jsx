import { useState } from "react";
import FaceDetection from "./Components/FaceDetection.jsx";
import MoodSongs from "./Components/MoodSongs.jsx";
import "./App.css";
function App() {
  const [Songs, setSongs] = useState([]);
  return (
    <>
      <div className="app">
        <FaceDetection setSongs={setSongs} />
        <MoodSongs songs={Songs} />
      </div>
    </>
  );
}

export default App;
