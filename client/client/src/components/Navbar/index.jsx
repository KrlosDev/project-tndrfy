import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, ClickAwayListener, Portal } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBackRounded";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.scss";
import logout from "../../utils/logout";
// import Button from "../Modal/button";
import Button from "@mui/material/Button";
import Modal, { ModalBody, ModalHeader } from "../Modal/modal";
import MuiModal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getUserInfo } from "../../redux/actions/userActions";
import { getSubscriptionTypes } from "../../redux/actions/subscriptionTypeActions";
import { getUserSubscription } from "../../redux/actions/subscriptionActions";

const Navbar = (props) => {
  const [menu, setMenu] = useState(false);
  const {
    subscriptionTypes,
    loadingSubscriptionTypes,
    logout: logoutSubscriptionTypes,
  } = useSelector((state) => state.subscriptionTypes);
  const {
    user,
    logout: logoutUserInfo,
    loadingUserInfo,
  } = useSelector((state) => state.userInfo);
  const {
    subscription,
    loadingUserSubscription,
    logout: logoutUserSubscription,
  } = useSelector((state) => state.subscription);

  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [tutorial, setTutorial] = useState(false);

  useEffect(() => {
    if (logoutSubscriptionTypes || logoutUserSubscription) {
      dispatch({ type: "RESET" });
      logout(history);
    }
  }, [logoutSubscriptionTypes, logoutUserSubscription, logoutUserInfo]);
  useEffect(() => {
    // const cookies = new Cookies();
    if (cookies.get("has-seen-tutorial") === "true") {
      setTutorial(false);
    } else setTutorial(true);
    dispatch(getUserInfo(token));
  }, []);

  useEffect(() => {
    // const cookies = new Cookies();
    // const token = cookies.get("token");
    // if (!token) {
    //   console.log("looggging out from home");
    //   dispatch({ type: "RESET" });
    //   logout(history);
    // }
    if (!subscriptionTypes) dispatch(getSubscriptionTypes(token));
    if (!subscription) dispatch(getUserSubscription(token));
  }, [subscriptionTypes, subscription]);
  const handlePaymentLink = async (subscriptionTypeId) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    try {
      const link = await fetch(
        "http://localhost:5000/api/pay/subscription-types/" +
          subscriptionTypeId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      ).then((res) => res.json());
      // console.log(link);
      if (link?.logout) return logout(history);
      else if (!link?.success)
        return alert(link?.error ?? "Error al intentar conseguir el pago");

      window.location.href = link.link;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      {/* <div className={styles.left}> */}
      {/* <div className={styles.icon} onClick={() => history.goBack()}>
					<ArrowBackIosRoundedIcon />
				</div>
				<div className={styles.icon} onClick={() => history.goForward()}>
					<ArrowForwardIosRoundedIcon />
				</div> */}
      {/* </div> */}
      <div className={styles.right}>
        <div>
          {!subscription && (
            <Button variant="contained" onClick={() => setShowModal(true)}>
              <p>Obtener Premium</p>
            </Button>
          )}
          <Portal>
            <Modal
              show={showModal}
              setShow={setShowModal}
              // hideCloseButton
            >
              <ModalHeader>
                <p className={styles.modal_header}>
                  ¡Actualiza tu plan a premium!
                </p>
              </ModalHeader>
              <ModalBody>
                {subscriptionTypes &&
                  subscriptionTypes.map((type) => {
                    // console.log(type);
                    return (
                      <div key={type._id} className={styles.modal_body}>
                        <p className={styles.modal_body_title}>{type.name}</p>
                        <p className={styles.modal_subtitle}>Descripción</p>
                        <p className={styles.modal_description}>
                          {type.description}
                        </p>
                        <p className={styles.modal_subtitle}>Beneficios</p>
                        <ul>
                          {type.benefits.map((benefit, i) => {
                            return <li key={i}>{benefit}</li>;
                          })}
                        </ul>
                        <div className={styles.button_container}>
                          <Button
                            variant="contained"
                            color="success"
                            className={styles.modal_button}
                            onClick={() => handlePaymentLink(type._id)}
                          >
                            Pagar {Number(type.price).toFixed(2)} $ + ITBMS
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </ModalBody>
            </Modal>
            <MuiModal
              open={tutorial}
              onClose={() => {
                //save in cookies
                cookies.set("has-seen-tutorial", "true");
                setTutorial(false);
              }}

              // className={styles.tutorial_modal}
            >
              <Box
                onClick={() => {
                  cookies.set("has-seen-tutorial", "true");
                  setTutorial(false);
                }}
                className={styles.tutorial_modal}
              >
                {/* <ModalBody>
                <p>
                  <span className={styles.modalTitle}>¡Bienvenido!</span>
                  <br />
                  <span className={styles.modal_subtitle}>
                    ¡Hola {user?.name}!
                  </span>
                </p>
                <p>
                  <span className={styles.modal_subtitle}>
                    Haz click y mantelo sobre la tarjeta de la canción para
                    moverla!
                  </span>
                  <br />
                  <span className={styles.modal_subtitle}>
                    Si quieres darle like, muevela a la derecha.
                  </span>
                  <span className={styles.modal_subtitle}>
                    Si quieres darle dislike, muevela a la izquierda.
                  </span>
                </p>
              </ModalBody> */}

                <div className={styles.card}>
                  <ArrowBackIcon className={styles.back_icon} />
                  <ArrowForwardIcon className={styles.forward_icon} />
                </div>
              </Box>
            </MuiModal>
          </Portal>
        </div>

        <div
          style={{ backgroundColor: `${menu ? "#282828" : "#000000"}` }}
          className={styles.profile_menu}
          onClick={() => setMenu(!menu)}
        >
          <AccountCircleIcon />
          {user && (
            <p>
              {user?.name ?? ""} {user?.lastname ?? ""}
            </p>
          )}
          {menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </div>
      {menu && (
        <ClickAwayListener onClickAway={() => setMenu(false)}>
          <div className={styles.menu} onClick={() => setMenu(false)}>
            {/* <Link to="/me">
              <div className={styles.options}>
                <p>Profile</p>
                <PersonIcon />
              </div>
            </Link> */}
            {/* <div className={styles.options}>
              <p>Settings</p>
              <SettingsIcon />
            </div> */}

            <div
              className={styles.options}
              onClick={() => {
                //close local session. still shoudl call server to tell token is invalid for 2 hours
                logout(history);
                if (props?.setAlert)
                  props.setAlert({
                    type: "success",
                    message: "Cerrando de Sesión Completo",
                    open: true,
                  });
                // alert("Cerrando sesion");
              }}
            >
              <p>Logout</p>
              <LogoutIcon />
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Navbar;
