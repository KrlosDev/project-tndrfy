import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie"

const PrivateRoute = ({ component: Component,  ...rest }) => {
	const styles = {
		padding: "6rem 0 0 26rem",
		backgroundColor: "#181818",
		color: "#ffffff",
		minHeight: "calc(100vh - 6rem)",
	};

	const cookies = new Cookies();
	const token = cookies.get("token");

	return (
		<Route
			{...rest}
			render={(props) =>
				token ? (
					<div style={styles}>
						<Component {...props} />
					</div>
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
