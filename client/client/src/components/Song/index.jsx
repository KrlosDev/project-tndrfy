import { useState, useEffect, useRef } from "react";
// import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";
import Cookies from "universal-cookie";
import Like from "../../utils/songs/like";
import Dislike from "../../utils/songs/dislike";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_SONG_DATA,
  LOADING_SONG_DATA,
  PAUSE_SONG,
  PLAY_SONG,
  SET_SONG_DATA,
} from "../../redux/constants/songConstants";
import logout from "../../utils/logout";
import { useHistory } from "react-router-dom";

const useAudio = (url) => {
  const dispatch = useDispatch();

  const [audio] = useState(new Audio(url));
  const { playing } = useSelector((state) => state.songPlayer);
  ///send updates about the audio timer
  // const timer =

  const setPlaying = (currentlyPlaying) => {
    dispatch({
      type: SET_SONG_DATA,
      payload: {
        currentTime: audio.currentTime,
        duration: audio.duration,
      },
    });
    if (currentlyPlaying) dispatch({ type: PLAY_SONG });
    else dispatch({ type: PAUSE_SONG });
  };
  const toggle = () => {
    setPlaying(!playing);
  };
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    dispatch({ type: LOADING_SONG_DATA });
    audio.addEventListener("loadeddata", () => {
      // console.log("loaded", { audio, duration: audio.duration });
      dispatch({
        type: SET_SONG_DATA,
        payload: {
          duration: audio.duration,
          // audio: Object.assign({}, audio),
        },
      });
    });

    audio.addEventListener("play", () => {
      // console.log("audios", { audio });
      dispatch({
        type: SET_SONG_DATA,
        payload: {
          currentTime: audio?.currentTime,
          duration: audio.duration,
        },
      });
    });
    audio.addEventListener("ended", () => {
      dispatch({
        type: SET_SONG_DATA,
        payload: {
          currentTime: audio?.currentTime,
          duration: audio.duration,
        },
      });
      setPlaying(false);
    });
    return () => {
      audio.removeEventListener("ended", () => {
        console.log("ended");
        dispatch({
          type: CLEAR_SONG_DATA,
        });
        audio.pause();
        setPlaying(false);
      });
      audio.removeEventListener("canplay", () => {
        console.log("destroying can play");

        dispatch({ type: CLEAR_SONG_DATA });
        audio.pause();
        setPlaying(false);
      });
    };
  }, []);

  return [playing, toggle];
};

const Song = ({ song, onClick, handleNextSong, setAlert, setInteracted }) => {
  const [menu, setMenu] = useState(false);
  // const audio = new Audio("data:application/mp3;base64," + song.song);
  // const audio = new Audio("./songs/song.mp3");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const history = useHistory();

  const [playing, toggle] = useAudio(
    `http://localhost:5000/api/music?name=${song.song}&token=${Buffer.from(
      token
    ).toString("hex")}`
  );

  const divRef = useRef();
  const filterRef = useRef();

  //dragability

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let initialX = 0;
  let initialY = 0;

  let finalX = 0;
  let finalY = 0;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    initialX = divRef.current.offsetLeft;
    initialY = divRef.current.offsetTop;

    // console.log({ initialX, initialY, pos3, pos4 });

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    divRef.current.style.top = divRef.current.offsetTop - pos2 + "px";
    divRef.current.style.left = divRef.current.offsetLeft - pos1 + "px";

    //fade song ??
    const borderRange = initialX / 3;
    //opacity depends on how far away from center
    if (Math.abs(initialX - divRef.current.offsetLeft) > borderRange) {
      const opacity = Math.max(
        0.1,
        1 -
          (Math.abs(initialX - divRef.current.offsetLeft) - borderRange) /
            (borderRange * 2)
      );
      filterRef.current.style.display = "block";
      divRef.current.style.opacity = opacity;
      //if left border then color red
      if (divRef.current.offsetLeft < initialX) {
        filterRef.current.style.backgroundColor = `rgba(255,0,0,${Math.min(
          1 - opacity,
          0.5
        )})`;
      }
      //if right border then color green
      if (divRef.current.offsetLeft > initialX) {
        filterRef.current.style.backgroundColor = `rgba(0,255,0,${Math.min(
          1 - opacity,
          0.5
        )})`;
      }
    } else {
      divRef.current.style.opacity = 1;
      filterRef.current.style.backgroundColor = "transparent";
      filterRef.current.style.display = "none";
    }

    // setTimeout(() => {
    //   divRef.current.style.top = divRef.current.offsetTop - pos2 + "px";
    //   divRef.current.style.left = divRef.current.offsetLeft - pos1 + "px";
    // });
  }

  async function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    //animation to move back to original position
    divRef.current.style.opacity = 1;
    filterRef.current.style.backgroundColor = "transparent";
    filterRef.current.style.display = "none";

    let x = 2;
    let y = 2;

    finalX = divRef.current.offsetLeft;
    finalY = divRef.current.offsetTop;
    let offsetWidth = divRef.current.offsetWidth;

    let newY, newX;

    if (finalX > initialX + offsetWidth / 3) {
      //animate move to right

      //save song to liked list , aka default playlist// aka like

      toggle();
      try {
        const res = await Like({ token, song });
        console.log(res);
        if (res?.logout) logout(history);
        else if (res?.error)
          setAlert({
            open: true,
            type: "error",
            message: res?.error,
          });

        //call next song
        handleNextSong();
      } catch (e) {
        console.log(e);
      }
      //   divRef.current.style.opacity = 0;
      //   divRef.current.style.display = "none";
      //reset position
      //   divRef.current.style.left = initialX + "px";
      //   divRef.current.style.top = initialY + "px";
      //   divRef.current.style.display = "flex";
      //   if (res) {
      //   divRef.current.style.display = "flex";
      //   }
      return;
    } else if (finalX < initialX - offsetWidth / 3) {
      //animate move to left
      //   divRef.current.style.opacity = 0;

      //play current song
      toggle();
      try {
        const res = await Dislike({ token, song });
        console.log(res);
        if (res?.logout) logout(history);
        else if (res?.error)
          setAlert({
            open: true,
            type: "error",
            message: res?.error,
          });

        //call next song
        handleNextSong();
      } catch (e) {
        console.log(e);
      }

      // let motion = { motion: "left", song }
      //   divRef.current.style.display = "none";
      //   divRef.current.style.left = initialX + "px";
      //   divRef.current.style.top = initialY + "px";
      //   if (res) {
      //   divRef.current.style.display = "flex";
      //   }
      //   divRef.current.style.display = "flex";
      return;
    }
    //animation to move back to original position
    let currentInt = setInterval(() => {
      let currentY = divRef.current.offsetTop;
      let currentX = divRef.current.offsetLeft;

      //   console.log({ currentY, initialY, currentX, initialX });
      if (currentY === initialY) {
        newY = currentY;
      } else if (currentY > initialY) {
        newY = currentY + y--;
        if (newY < initialY) {
          newY = initialY;
        }
      } else if (currentY < initialY) {
        newY = currentY + y++;
        if (newY > initialY) {
          newY = initialY;
        }
      }
      if (currentX === initialX) {
        newX = currentX;
      } else if (currentX > initialX) {
        newX = currentX + x--;
        if (newX < initialX) {
          newX = initialX;
        }
      } else if (currentX < initialX) {
        newX = currentX + x++;
        if (newX > initialX) {
          newX = initialX;
        }
      }

      divRef.current.style.top = newY + "px";
      divRef.current.style.left = newX + "px";

      if (newY === initialY && newX === initialX) {
        clearInterval(currentInt);
      }
    }, 10);
  }
  return (
    <div
      id="dragSongComponent"
      ref={divRef}
      className={styles.song_container}
      // onClick={onClick}
      onDragStart={dragMouseDown}
      onDragEnd={closeDragElement}
      // onClick={() => {
      //   console.log(audio);
      //   try {
      //     audio.play();
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }}
    >
      <div ref={filterRef} className={styles.filter_overlay}></div>
      {/* <div className={styles.left}> */}
      {/* k  */}
      <img className={styles.song_img} src={song.image} alt="song_img" />

      <IconButton
        className={styles.play_btn}
        onDragStart={dragMouseDown}
        onDragEnd={closeDragElement}
        onClick={() => {
          setInteracted(true);
          toggle();
        }}
      >
        {playing ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <div className={styles.bottom_bar}>
        <p>{song.name}</p>
        {/* </div> */}
        <p>{song.artist}</p>

        {/* <p>{song.duration}</p> */}
      </div>
      {/* <div className={styles.right}> */}
      {/* <Like songId={song._id} /> */}

      {/* <IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
          <MoreHorizIcon />
        </IconButton>
        {menu && (
          <PlaylistMenu playlist={playlist} closeMenu={() => setMenu(false)} />
        )} */}
      {/* </div> */}
    </div>
  );
};

export default Song;
