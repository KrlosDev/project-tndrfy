import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./styles.module.scss";

const CheckboxInput = ({ label, ...rest }) => {
	return (
		<FormControlLabel
			className={styles.checkbox_container}
			control={
				<Checkbox
					{...rest}
					style={{ color: " rgb(54, 102, 144)" }}
					className={styles.checkbox}
				/>
			}
			label={label}
		/>
	);
};

export default CheckboxInput;
