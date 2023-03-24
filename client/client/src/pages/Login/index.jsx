import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import Cookies from "universal-cookie";
import Logo from "../../images/black_logo.jsx";
import styles from "./styles.module.scss";

// import MessageSnack from "../../components/MessageSnack";
// import { useDispatch } from "react-redux";
// import { getUserInfo } from "../../redux/actions/userActions";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputState = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors({ ...errors, [name]: value });
  };
  useEffect(() => {
    const cookies = new Cookies();
    // try {
    //   const token = cookies.get("token");
    //   if (token) {
    //     history.push("/home");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    const rememberedEmail = cookies.get("email");
    const rememberedMe = cookies.get("remember_me");
    // console.log(rememberedEmail);
    if (rememberedEmail) {
      setData({
        ...data,
        email: rememberedEmail,
        remember_me: rememberedMe === "true",
      });
    }
  }, []);
  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  const history = useHistory();
  // const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length !== 0)
      // console.log("please fill out properly");
      return props.setAlert({
        open: true,
        type: "error",
        message: "Llena los campos correctamente porfavor",
      });

    const cookies = new Cookies();
    if (data.remember_me) {
      console.log("remember me!", data);
      //cookie save
      cookies.set("email", String(data.email), { path: "/" });
      cookies.set("remember_me", String(data.remember_me), { path: "/" });
    } else {
      cookies.set("email", "", { path: "/" });
    }

    try {
      const result = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (!result?.success)
        return props.setAlert({
          open: true,
          type: "warning",
          message: result?.error ?? "Error desconocido",
        });

      // return alert(result?.error);
      // dispatch(getUserInfo(result.token));
      //save token to store or cookies or something.
      cookies.set("token", result.token);

      history.push("/home");
      // alert("Login exitoso");
    } catch (e) {
      console.log(e);
      return props.setAlert({
        open: true,
        type: "error",
        message: e ?? "Error de registro desconocido",
      });
      // alert("Error al registrarse");
    }

    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Link to="/" className={styles.cont}>
          {/* <img src={logo} alt="logo" /> */}
          <Logo className={styles.logo} />
          <h1 className={styles.heading}>Tinderfy</h1>
        </Link>
      </div>
      <main className={styles.main}>
        <h1 className={styles.heading}>
          Para continuar, debes hacer login en Tinderfy.
        </h1>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className={styles.input_container}>
            <TextField
              label="Coloca tu correo electrónico"
              placeholder="Coloca tu correo electrónico"
              name="email"
              handleInputState={handleInputState}
              schema={schema.email}
              handleErrorState={handleErrorState}
              value={data.email}
              error={errors.email}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Password"
              placeholder="Password"
              name="password"
              handleInputState={handleInputState}
              schema={schema.password}
              handleErrorState={handleErrorState}
              value={data.password}
              error={errors.password}
              type="password"
              required={true}
            />
          </div>
          {/* <p className={styles.forgot_password}>¿Ólvidaste tu password?</p> */}
          <div className={styles.form_bottom}>
            <Checkbox
              label="Recuerdame"
              checked={data.remember_me}
              onChange={(val) =>
                setData((data) => {
                  return { ...data, remember_me: val.target.checked };
                })
              }
            />
            <Button
              type="submit"
              label="LOG IN"
              style={{ color: "white", background: "black", width: "20rem" }}
            />
          </div>
        </form>
        <h1 className={styles.dont_have_account}>¿No tienes una cuenta?</h1>
        <Link to="/signup">
          <button className={styles.outline_btn}>
            Create tu cuenta de tinderfy!
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Login;
