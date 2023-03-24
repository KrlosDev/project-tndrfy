import { useState } from "react";
import Joi from "joi";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import Logo from "../../images/black_logo.jsx";
import styles from "./styles.module.scss";

const months = [
  { name: "Enero", value: "01" },
  { name: "Febrero", value: "02" },
  { name: "Marzo", value: "03" },
  { name: "Abril", value: "04" },
  { name: "Mayo", value: "05" },
  { name: "Junio", value: "06" },
  { name: "Julio", value: "07" },
  { name: "Agosto", value: "08" },
  { name: "Septiembre", value: "09" },
  { name: "Octubre", value: "10" },
  { name: "Noviembre", value: "11" },
  { name: "Diciembre", value: "12" },
];

const genders = [
  {
    label: "Hombre",
    value: "m",
  },
  {
    label: "Mujer",
    value: "f",
  },
  {
    label: "Otro",
    value: "o",
  },
];

const SignUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    month: "",
    year: "",
    date: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputState = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorState = (name, value) => {
    value === ""
      ? delete errors[name]
      : setErrors(() => ({ ...errors, [name]: value }));
  };

  const schema = {
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: passwordComplexity({
      min: 8,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    })
      .required()
      .label("Password"),
    name: Joi.string().min(5).max(10).required().label("Name"),
  };

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log(data);
      data.birthday = new Date(`${data.year}-${data.month}-${data.date}`);
      try {
        const result = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());

        if (!result?.success) return alert(result?.error);
        history.push("/login");
        alert("Cuenta creada con éxito");
      } catch (e) {
        console.log(e);
        return alert("Error al registrarse");
      }
    } else {
      console.log("please fill out properly");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {/* <img src={logo} alt="logo" /> */}
        <Logo className={styles.img} />
        <h1 className={styles.heading}>Tinderfy</h1>
      </div>
      <h1 className={styles.heading}>Registrate para escuchar gratis!</h1>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        {/* <h2 className={styles.form_heading}></h2> */}
        <div className={styles.input_container}>
          <TextField
            label="¿Cual es tu correo?"
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
            label="Ingresa tu contraseña"
            placeholder="Ingresa tu contraseña"
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
        <div className={styles.input_container}>
          <TextField
            label="¿Cual es tu nombre?"
            placeholder="Ingresa tu nombre"
            name="name"
            handleInputState={handleInputState}
            schema={schema.name}
            handleErrorState={handleErrorState}
            value={data.name}
            error={errors.name}
            required={true}
          />
        </div>
        <div className={styles.input_container}>
          <TextField
            label="¿Cual es tu apellido?"
            placeholder="Ingresa tu apellido"
            name="lastname"
            handleInputState={handleInputState}
            schema={schema.lastname}
            handleErrorState={handleErrorState}
            value={data.lastname}
            error={errors.lastname}
            required={true}
          />
        </div>
        <div className={styles.date_of_birth_container}>
          <p>¿Cual es tu fecha de nacimiento?</p>
          <div className={styles.date_of_birth}>
            <div className={styles.month}>
              <Select
                name="month"
                handleInputState={handleInputState}
                label="Month"
                placeholder="Months"
                options={months}
                value={data.month}
                required={true}
              />
            </div>
            <div className={styles.date}>
              <TextField
                label="Date"
                placeholder="DD"
                name="date"
                value={data.date}
                handleInputState={handleInputState}
                required={true}
              />
            </div>
            <div className={styles.year}>
              <TextField
                label="Year"
                placeholder="YYYY"
                name="year"
                value={data.year}
                handleInputState={handleInputState}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className={styles.input_container}>
          <Radio
            label="¿Cual es tu género?"
            name="gender"
            handleInputState={handleInputState}
            options={genders}
            required={true}
          />
        </div>

        <div className={styles.submit_btn_wrapper}>
          <Button label="Registrarme" type="submit" />
        </div>
        <p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
          ¿Tienes una cuenta? <Link to="/login">Ingresa aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
