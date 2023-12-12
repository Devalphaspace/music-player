// src/components/MusicPlayer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://spotify23.p.rapidapi.com/playlist_tracks/', {
          params: {
            id: '37i9dQZF1DX4Wsb4d7NKfP',
            offset: '0',
            limit: '100',
          },
          headers: {
            'X-RapidAPI-Key': '1ca9d6dc97msha5ea4f512661f61p1e07c5jsn4898426ae91d',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          },
        });

        // Check if tracks array exists before setting the playlist
        if (response.data.items && response.data.items.length > 0) {
          setPlaylist(response.data.items);
        } else {
          console.error('Error: No tracks found in the response');
        }
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (audioRef) {
      // Set up event listeners for time updates and duration change
      audioRef.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.addEventListener('loadedmetadata', handleDurationChange);

      // Cleanup event listeners when the component unmounts
      return () => {
        audioRef.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.removeEventListener('loadedmetadata', handleDurationChange);
      };
    }
  }, [audioRef]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.duration);
  };

  const playPauseHandler = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSongHandler = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const prevSongHandler = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const selectTrackHandler = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleAudioEnded = () => {
    // Automatically play the next song when the current one ends
    nextSongHandler();
  };

  const handleSliderChange = (event) => {
    if (audioRef) {
      const newTime = event.target.value;
      setCurrentTime(newTime);
      audioRef.currentTime = newTime;
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Music Player</h1>
      {playlist.length > 0 && (
        <div>
          <p>{playlist[currentTrackIndex].track.name}</p>
          <audio
            ref={(audio) => setAudioRef(audio)}
            src={playlist[currentTrackIndex].track.preview_url}
            onEnded={handleAudioEnded}
          />
          <div>
            <button onClick={playPauseHandler}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={prevSongHandler}>Previous</button>
            <button onClick={nextSongHandler}>Next</button>
          </div>
          <div>
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            step="1"
            value={currentTime}
            onChange={handleSliderChange}
          />
          <ul>
            {playlist.map((item, index) => (
              <li key={item.track.id} onClick={() => selectTrackHandler(index)}>
                {item.track.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
