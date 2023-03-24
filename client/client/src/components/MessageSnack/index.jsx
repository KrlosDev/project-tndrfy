import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import styles from "./styles.module.scss";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MessageSnack = ({ alert, setAlert }) => {
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={() =>
        setAlert({
          ...alert,
          open: false,
        })
      }
    >
      <Alert
        onClose={() =>
          setAlert({
            ...alert,
            open: false,
          })
        }
        severity={alert.type}
        sx={{
          width: "100%",
          fontSize: "1.5rem",
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default MessageSnack;
