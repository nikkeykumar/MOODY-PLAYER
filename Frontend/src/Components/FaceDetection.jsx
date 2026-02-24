import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./FaceDetection.css";
import axios from "axios";

const FaceDetection = ({ setSongs }) => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  };

  const scanFace = async () => {
    setLoading(true);

    const video = videoRef.current;

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      alert("No face detected ❌");
      setLoading(false);
      return;
    }

    let mostProbable = 0;
    let detectedMood = "";

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbable) {
        mostProbable = detections[0].expressions[expression];
        detectedMood = expression;
      }
    }

    setMood(detectedMood);

    try {
      const res = await axios.get(
        `https://moody-player-2y08.onrender.com/api/songs?mood=${detectedMood}`,
      );
      setSongs(res.data.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="mood-container">
      <div className="video-card">
        <video ref={videoRef} autoPlay muted className="user-video-feed" />
      </div>

      <button onClick={scanFace} className="scan-btn" disabled={loading}>
        {loading ? "Scanning..." : "Scan Face"}
      </button>

      {mood && <p className="mood-text">Detected Mood: {mood}</p>}
    </div>
  );
};

export default FaceDetection;
