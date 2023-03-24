import { Link } from "react-router-dom";
import Button from "../../components/Button";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Logo from "../../images/white_logo.jsx";
import styles from "./styles.module.scss";

const navLinks = [
	//   { name: "Premium", link: "#" },
	//   { name: "Support", link: "#" },
	//   { name: "Download", link: "#" },
	{ name: "Registrarme", link: "/signup" },
	{ name: "Ingresar", link: "/login" },
];

const footerIcons = [<InstagramIcon />, <TwitterIcon />, <FacebookIcon />];

const Main = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container}>
				<Link to="/" className={styles.nav_logo}>
					<Logo className={styles.logo} />
				</Link>
				<div className={styles.nav_links}>
					{navLinks.map((link, index) => (
						<Link key={index} to={link.link} className={styles.links}>
							{link.name}
						</Link>
					))}
				</div>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<h1>Encuentra la música a tu gusto</h1>
					<Link to="/signup">
						<Button
							label="EMPEZAR AHORA"
							style={{ color: "#fff", width: "18rem", fontSize: "1.4rem" }}
						/>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<Link to="/" className={styles.footer_logo}>
						{/* <img src={logo} alt="logo" /> */}
						<Logo className={styles.logo} />
					</Link>
					</div>
					<div className={styles.footer_icons}>
						{footerIcons.map((icon, index) => (
							<div className={styles.icon} key={index}>
								{icon}
							</div>
						))}
					</div>
				<div className={styles.footer_2}>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2022 Tinderfy</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Main;