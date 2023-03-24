import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";
import Logo from "../../images/white_logo";

const playlists = [
  { _id: 1, img: "", name: "Playlist 1 ejemplo", desc: "By Krlosz" },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      {/* <img className={styles.logo_img} src={logo} alt="logo" /> */}
      {/*<span className={styles.hide_button} id="hide">Hide</span>*/}
      <div className={styles.logo_container}>
        <Logo className={styles.logo} />
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Tinderfy
        </h1>
      </div>
      <NavLink
        to="/home"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <HomeIcon />
        <span>Inicio</span>
      </NavLink>
      <NavLink
        to="/search"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <SearchIcon />
        <span>Busqueda</span>
      </NavLink>
      <NavLink
        to="/collection/playlists"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <LibraryMusicIcon />
        <span>Mis Playlist</span>
      </NavLink>
      <div className={styles.create_playlist_btn}>
        <AddIcon />
        <span>Crear Playlist</span>
      </div>
      <NavLink
        to="/collection/tracks"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <img src={likeImg} alt="jfo" />
        <span>Liked Songs</span>
      </NavLink>
      <div className={styles.underline}></div>
      {playlists.map((playlist) => (
        <NavLink
          key={playlist._id}
          to={`/playlist/${playlist._id}`}
          activeClassName={styles.active_link}
          className={styles.playlist_link}
        >
          {playlist.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
