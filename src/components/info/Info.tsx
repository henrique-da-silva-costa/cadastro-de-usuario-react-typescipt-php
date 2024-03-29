import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Info.module.css";
import { BiLeftArrow } from "react-icons/bi";
import img from "../../logo.svg";
import Loading from "../../Loading";

interface d {
  id?: number;
  nome?: string;
  email?: string;
  idade?: number;
  img?: string;
}

const Info = () => {
  const [dados, setDados] = useState<Array<d>>();
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const p = useParams();
  const id = p.id;

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `https://henriquedeveloper.com.br/backend-cadastro/home/item.php?id=${id}`
        )
        .then((res) => {
          setDados(res.data);
          setLoading(true);
        });
    }, 1300);
  }, []);

  return (
    <div
      className={styles.item}
      style={{ backgroundImage: `url(${dados ? dados[0].img : ""})` }}
    >
      <button className={styles.back} onClick={() => nav("/home")}>
        <BiLeftArrow />
      </button>
      <div className={styles.block}>
        {dados ? (
          <div className={styles.elements}>
            <img src={dados ? dados[0].img : ""} alt="" />
            <h3>Nome</h3>
            <p>{dados ? dados[0].nome : ""}</p>
            <div className={styles.line}></div>
            <h3>E-mail</h3>
            <p>{dados ? dados[0].email : ""}</p>
            <div className={styles.line}></div>
            <h3>Idade</h3>
            <p>{dados ? dados[0].idade : ""}</p>
          </div>
        ) : (
          ""
        )}
        {!loading ? <Loading /> : ""}
        {/* <Loading /> */}
      </div>
    </div>
  );
};

export default Info;
