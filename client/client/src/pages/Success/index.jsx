import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const Estado = params.get("Estado");
  const totalPagado = params.get("TotalPagado");
  const fecha = params.get("Fecha");
  const Hora = params.get("Hora");
  const Tarjeta = params.get("Tipo");
  const email = params.get("Email");
  const nombre = params.get("Usuario");
  const razon = params.get("CDSC");

  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.main}>
          <h2>Usuario: <p>{nombre}</p></h2>
          <h2>Email: <p>{email}</p></h2>
          <h2>Tarjeta tipo: <p>{Tarjeta}</p></h2>
          <h2>Transaccion: <p>{Estado}</p></h2>
          <h2>Fecha: <p>{fecha}</p></h2>
          <h2>Hora: <p>{Hora}</p></h2>
          <h2>Producto: <p>{razon}</p></h2>
          <h2>Se cobro: <p>{totalPagado} USD</p></h2>
          <span onClick={() => history.push("/home")}>Regresa a Home</span>
        </div>
      </div>
    </div>
  );
};

export default Success;
