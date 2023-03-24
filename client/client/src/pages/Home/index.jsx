import { Fragment, useLayoutEffect, useEffect, useState } from "react";
import Song from "../../components/Song";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import logout from "../../utils/logout";
import { getNextRandomSong } from "../../redux/actions/songActions";
import IconButton from "@mui/material/IconButton";
import Refresh from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import { PAUSE_SONG, PLAY_SONG } from "../../redux/constants/songConstants";
import MessageSnack from "../../components/MessageSnack";

// const playlists = [
//   { _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Krlosz" },
// ];

const Home = (props) => {
  //   const {
  //     songs,
  //     loadingGetSongs,
  //     error: getSongsError,
  //     logout: getSongsLogout,
  //   } = useSelector((state) => state.songs);
  const [interacted, setInteracted] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const {
    song,
    loadingGetNextRandomSong: loadingSong,
    error: songError,
    success: songSuccess,
    logout: songLogout,
  } = useSelector((state) => state.song);

  // const [loadingSong, setLoadingSong] = useState(false);
  // const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  //   useEffect(() => {
  //     //handle songs?
  //     if (getSongsError && !songs) {
  //       alert(getSongsError ?? "No hay canciones, revisar con admin.");
  //     }
  //     if (getSongsLogout) {
  //       dispatch({ type: "RESET" });
  //       logout(history);
  //     }
  //   }, [songs, getSongsError, getSongsLogout]);

  useLayoutEffect(() => {
    //loader

    if (
      typeof loadingSong !== "boolean" ||
      loadingSong === true ||
      song === null
    )
      return;

    console.log("loading rand", {
      song,
      loadingSong,
      songError,
      songSuccess,
      songLogout,
    });

    // if (song && !loadingSong) {
    if (songLogout) {
      console.log("Logging out cuz of song");
      dispatch({ type: "RESET" });
      return logout(history);
    } else if (!songSuccess) {
      // setSong(null);
      console.log("rrO", songError, songSuccess);
      return setAlert({
        open: true,
        type: "warning",
        message: songError ?? "Error al intentar conseguir la canción",
      });
    }
    //play if new song and has interacted
    else if (interacted && songSuccess) dispatch({ type: PLAY_SONG });
    // }
    // dispatch(getSongs(token));
  }, [songSuccess, loadingSong]);

  //on startup if there's no song and it's not loading, add a new song to play
  useEffect(() => {
    if (song === null && !loadingSong) {
      console.log("nextSong");
      handleNextSong();
    }
  }, []);
  const handleNextSong = async () => {
    // try {
    //clear current song
    // setSong(null);
    // setLoadingSong(true);

    dispatch({ type: PAUSE_SONG });
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (!token) {
      dispatch({ type: "RESET" });
      return logout(history);
    }
    dispatch(getNextRandomSong(token));
    // const res = await getNextRandomSong(token);

    // setLoadingSong(false);

    // setSong(res.song);
    //   return true;
    // } catch (e) {
    //   console.log(e);
    //   setSong(null);
    //   setLoadingSong(false);
    //   return false;
    // }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        {loadingSong && (
          <CircularProgress className={styles.loader}>
            Loading...
          </CircularProgress>
        )}

        {!loadingSong && song ? (
          <Song
            song={song}
            handleNextSong={handleNextSong}
            setInteracted={setInteracted}
            {...props}
          />
        ) : (
          <IconButton
            className={styles.play_btn}
            onClick={() => {
              setInteracted(true);
              handleNextSong();
            }}
          >
            <Refresh className={styles.refresh} />
          </IconButton>
        )}
      </div>
      <MessageSnack alert={alert} setAlert={setAlert} />
    </Fragment>
  );
};

export default Home;
