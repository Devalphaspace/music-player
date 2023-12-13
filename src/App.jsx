import { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { ChevronDown, Heart } from "lucide-react";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { RxLoop } from "react-icons/rx";
import { MdFormatListBulleted } from "react-icons/md";
import { HiPause } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useQuery } from "react-query";

const fetchPlaylist = async () => {
  const response = await axios.get(
    "https://spotify23.p.rapidapi.com/playlist_tracks/",
    {
      params: {
        id: "37i9dQZF1DX4Wsb4d7NKfP",
        offset: "0",
        limit: "20",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_X_API_KEY,
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    }
  );

  return response.data?.items || [];
};

const App = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLikes] = useState(false);

  const { data: playlist = [], refetch } = useQuery("playlist", fetchPlaylist, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  // console.log(playlist);

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.addEventListener("loadedmetadata", handleDurationChange);

      return () => {
        audioRef.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.removeEventListener("loadedmetadata", handleDurationChange);
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
    setIsPlaying(false);
  };

  const prevSongHandler = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length
    );
    setIsPlaying(false);
  };

  const selectTrackHandler = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const handleAudioEnded = () => {
    nextSongHandler();
    setIsPlaying(!isPlaying);
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleOpenLists = () => {
    setIsModelOpen(!isModelOpen);
  };

  const handleLike = () => {
    setIsLikes(!isLiked);
  };


  return (
    <div
      className={`bg-gray-100  w-[100vw] h-[100vh] overflow-hidden sm:flex sm:items-center sm:justify-center p-[1.2rem] relative ${
        isModelOpen ? "open-model" : "closed-model"
      }`}
    >
      <div className="hidden  sm:flex sm:p-3 rounded-lg h-[100px]  items-center justify-center border border-gray-50 shadow-md gap-2 w-[270px] sm:bg-white">
        <RxCross2 className="text-red-500" /> Only mobile-compatible.
      </div>
      <div className="w-[100%] mt-3 h-[98%] flex items-center justify-evenly pb-6 flex-col sm:hidden ">
        <div className="search flex items-center justify-center border border-gray-100 p-[.5rem] px-[1rem] w-full rounded-[20px] shadow-md">
          <input
            type="text"
            placeholder="Search latest music..."
            className=" focus:outline-none bg-transparent  w-full"
          />
          <CiSearch size={20} className="w-[10%]" />
        </div>

        <div className="mt-8 w-[100%] h-[320px]  rounded-xl overflow-hidden">
          <img
            className="w-[100%] h-full object-cover"
            src={playlist[currentTrackIndex]?.track?.album?.images[0]?.url}
            alt=""
          />
        </div>

        <div className="titlebox w-[98%] mt-8 flex items-start flex-col justify-center">
          <div className=" flex items-center w-[98%] justify-between">
            <p className=" max-w-[80%] font-medium h-[26px] overflow-hidden">
              {playlist[currentTrackIndex]?.track?.name}
            </p>
            <Heart
              onClick={handleLike}
              color={`${isLiked ? "red" : "black"}`}
              size={20}
            />
          </div>
          <p className=" text-[12px]">
            Artist:{" "}
            {playlist[currentTrackIndex]?.track?.album?.artists[0]?.name}
          </p>
        </div>

        <div className="mt-8 w-[98%] flex items-start flex-col justify-center">
          <input
            type="range"
            min="0"
            max={duration}
            step="1"
            value={currentTime}
            onChange={handleSliderChange}
          />
          <div className=" flex w-[100%] mt-1 items-center justify-between">
            <p className="starttime text-[13px]">{formatTime(currentTime)}</p>
            <p className="endtime text-[13px]">{formatTime(duration)}</p>
          </div>
        </div>
        <audio
          ref={(audio) => setAudioRef(audio)}
          src={playlist[currentTrackIndex]?.track?.preview_url}
          onEnded={handleAudioEnded}
        />
        <div className="w-[98%] flex items-center justify-between mt-8 pb-3">
          <RxLoop className=" active:scale-90" />
          <IoPlaySkipBack
            onClick={prevSongHandler}
            className=" active:scale-90"
          />
          {isPlaying ? (
            <HiPause
              onClick={playPauseHandler}
              className="active:scale-90 shadow-lg w-[50px] h-[50px] p-2 rounded-full "
            />
          ) : (
            <IoPlay
              onClick={playPauseHandler}
              className="active:scale-90 shadow-lg w-[50px] h-[50px] p-2 rounded-full "
            />
          )}

          <IoPlaySkipForward
            onClick={nextSongHandler}
            className=" active:scale-90"
          />
          <MdFormatListBulleted
            onClick={handleOpenLists}
            className=" active:scale-90"
          />
        </div>
      </div>
      {/* Model Content */}
      <div
        className={`model-content absolute bottom-0 bg-[#f5f6fa] w-[100%] left-0 rounded-lg px-4 overflow-y-auto transition-transform duration-300 transform ${
          isModelOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "500px" }}
      >
        <div className="  mt-2 w-full flex items-center justify-center">
          <ChevronDown
            onClick={handleOpenLists}
            className="animate-bounce text-center"
          />
        </div>

        {playlist?.map((item, index) => {
          // console.log(item);
          return (
            <div
              key={index}
              className=" border-t mt-1 rounded-lg p-1 flex gap-2"
              onClick={() => {
                selectTrackHandler(index), handleOpenLists();
              }}
            >
              <div className="left">
                <img
                  className="w-[38px]  h-[38px] rounded-md object-cover"
                  src={item?.track?.album?.images[2]?.url}
                  alt=""
                />
              </div>
              <div className="right">
                <h3 className=" title max-w-[80%] font-medium text-[14px] h-[20px] overflow-hidden">
                  {" "}
                  {item?.track?.name}
                </h3>
                <p className="singer text-[12px]">
                  Artist: {item?.track?.album?.artists[0]?.name}
                </p>
              </div>
            </div>
          );
        })}

        {/* Your model content goes here */}
      </div>
    </div>
  );
};

export default App;
