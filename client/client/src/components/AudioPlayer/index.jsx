import Like from "../Like";
import { useState } from "react";
import { IconButton } from "@mui/material";
import Ghost from "../../images/peaches.jpg";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { PAUSE_SONG, PLAY_SONG } from "../../redux/constants/songConstants";
import { useEffect } from "react";
import { useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const AudioPlayer = () =>
  //{ playing, setPlaying }
  {
    // const [time] = useState(0);
    // { song, loadingSongData }
    const { song, loadingSongData } = useSelector(
      (state) => state.songPlayerData
    );
    const { playing } = useSelector((state) => state.songPlayer);
    // const [timerRunning,]
    // let [intervalTimer] = useState();
    // let intervalTimer; //= useRef();
    const [time, setTime] = useState(Math.floor(song?.currentTime ?? 0));
    // const [timer, setTimer] = useState(null);
    const timer = useRef();
    // const [timer, setTimer] = useState({
    //   time: Math.floor(song?.currentTime ?? 0),
    //   interval: null,
    // }); //Math.floor(song?.currentTime ?? 0));

    // console.log(playing, timer);
    const updateTimer = (newTime) => {
      // console.log("update", { playing, newTime });
      // if (playing)
      setTime(newTime);
      if (
        //!playing
        newTime >= (song?.duration ?? 0)
      ) {
        clearInterval(timer.current);
        setTime(0);
        timer.current = null;
      }
    };

    let seconds = Math.floor(song?.currentTime ?? 0);
    if (playing && !timer.current) {
      // console.log("creatingTimer", {
      //   playing,
      //   timer,
      //   song: song.currentTime,
      //   seconds,
      //   time,
      // });
      setTime(Math.round(++seconds));
      //first run fast.
      updateTimer(++seconds);
      timer.current = setInterval(() => updateTimer(++seconds), 1000);
    } else if (timer?.current && !playing) {
      //send last update
      setTime(Math.round(++seconds));
      //first run fast.
      clearInterval(timer.current);
      timer.current = null;
    } //else if(!playing )

    // console.log({ song, playing, loadingSongData });

    const dispatch = useDispatch();

    const handlePlay = () => {
      if (!playing) {
        dispatch({ type: PLAY_SONG });
      } else {
        dispatch({ type: PAUSE_SONG });
      }
    };
    const formatSecondsToMinutes = (secs) => {
      const minutes = Math.floor(secs / 60) || 0;
      const sec = Math.floor(secs % 60) || 0;
      // console.log({ minutes, seconds });
      return `${minutes.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    };
    return (
      <div className={styles.audio_player}>
        <div className={styles.left}>
          {/* <img src={Ghost} alt="song_img" /> */}
          {/* <div className={styles.song_info}>
          <p className={styles.song_name}>Ghost</p>
          <p className={styles.song_artist}>Justin Bieber</p>
        </div> */}
        </div>
        <div className={styles.center}>
          <div className={styles.audio_controls}>
            <IconButton className={styles.prev}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton className={styles.play} onClick={handlePlay}>
              {!playing ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
            <IconButton className={styles.next}>
              <SkipNextIcon />
            </IconButton>
          </div>
          <div className={styles.progress_container}>
            <p>{formatSecondsToMinutes(time)}</p>
            <div className={styles.progress}>
              {/* {console.log(
                "progress",
                (time / Math.floor(song?.duration ?? 0)) * 100
              )} */}
              <LinearProgress
                variant="determinate"
                value={(time / Math.floor(song?.duration ?? 1)) * 100}
              />
            </div>
            {/* <input
              type="range"
              step={time}
              min={0}
              max={Math.round(song?.duration ?? 0)}
              className={styles.progress}
            /> */}
            {/* <audio></audio> */}
            {/* <p>4.00</p> */}
            <p>{formatSecondsToMinutes(song.duration)}</p>
          </div>
        </div>
        <div className={styles.right}>{/* <Like /> */}</div>
      </div>
    );
  };

export default AudioPlayer;
