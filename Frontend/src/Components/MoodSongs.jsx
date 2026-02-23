import { useRef, useState } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ songs }) => {
  return (
    <div className="mood-songs">
      <h2>🎵 Recommended Songs</h2>

      {songs.map((song, index) => (
        <SongItem key={index} song={song} />
      ))}
    </div>
  );
};

const SongItem = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-card">
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>

      <div className="player">
        <audio ref={audioRef} src={song.audio} />
        <button onClick={togglePlay} className="play-btn">
          {isPlaying ? "Pause ⏸" : "Play ▶"}
        </button>
      </div>
    </div>
  );
};

export default MoodSongs;
