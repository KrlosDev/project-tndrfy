import { useState, Fragment } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import LikedSongs from "./pages/LikedSongs";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Cookies from "universal-cookie"
import MessageSnack from "./components/MessageSnack";


const App = () => {

	const [playing, setPlaying] = useState(false);

	const [alert, setAlert] = useState({
		open: false,
		type: "",
		message: "",
	});

	const location = useLocation();

	return (
		<Fragment>
			{//token &&
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !== "/payment/success" &&
				location.pathname !== "/payment/failure" &&
				location.pathname !== "/not-found" && (
					<Fragment>
						<Navbar alert={alert} setAlert={setAlert} />
						<Sidebar alert={alert} setAlert={setAlert} />
						<AudioPlayer playing={playing} setPlaying={setPlaying} />
					</Fragment>
				)}
			<Switch>
				<Route exact path="/" component={Main} />
				{/* <PrivateRoute exact  path="/home" component={Home} /> */}
				<PrivateRoute exact path="/home" component={(props) => (<Home
					{...props} alert={alert} setAlert={setAlert} />)} />

				<PrivateRoute
					exact
					path="/collection/tracks"
					component={LikedSongs}
				/>
				<PrivateRoute
					exact
					path="/collection/playlists"
					component={Library}
				/>
				<PrivateRoute exact path="/search" component={Search} />
				<PrivateRoute
					exact
					path="/playlist/:id"
					component={Playlist}
				/>
				<PrivateRoute exact path="/me" component={Profile} />
				{/* {token && <Redirect from="/signup" to="/home" />} */}
				{/* {token && <Redirect from="/login" to="/home" />} */}
				<Route path="/signup" component={SignUp} />
				{/* <Route path="/login" component={Login} /> */}
				<Route path="/login" component={(props) => (<Login {...props}
					alert={alert} setAlert={setAlert} />)} />
				<Route path="/not-found" component={NotFound} />
				<Route path="/payment/success" component={Success} />
				<Route path="/payment/failure" component={Success} />
				<Redirect to="/not-found" />

			</Switch>

			<MessageSnack alert={alert} setAlert={setAlert} />
		</Fragment>
	);
};

export default App;
