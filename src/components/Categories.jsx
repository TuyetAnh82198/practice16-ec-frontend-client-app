import { Container } from "react-bootstrap";

import soft_drinks from "../imgs/soft_drinks.jpg";
import juices from "../imgs/juices.png";
import teas from "../imgs/teas.png";
import dairy_drinks from "../imgs/dairy_drinks.png";
import water from "../imgs/water.jpg";

import styles from "./categories.module.css";

const Categories = () => {
  return (
    <Container>
      <div
        style={{
          fontWeight: "550",
          fontSize: "1.2rem",
          textAlign: "center",
          marginTop: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        OUR DRINKS
      </div>
      <Container className={`d-flex justify-content-between ${styles.drinks}`}>
        <div className={`col-6 ${styles.softDrinksImg}`}>
          <img
            width="96%"
            className={`shadow rounded-1`}
            src={soft_drinks}
            alt=""
          />
        </div>
        <div className={`col-6 ${styles.juicesImg}`}>
          <img width="96%" className="shadow rounded-1" src={juices} alt="" />
        </div>
      </Container>
      <Container
        style={{ marginTop: "1.2rem" }}
        className={`d-flex justify-content-between ${styles.drinks}`}
      >
        <div className={`col-4 ${styles.teasImg}`}>
          <img
            style={{ width: "94%", height: "16.5rem" }}
            className="shadow rounded-1"
            src={teas}
            alt=""
          />
        </div>
        <div className={`col-4 ${styles.dairyDrinksImg}`}>
          <img
            style={{ width: "94%", height: "16.5rem" }}
            className="shadow rounded-1"
            src={dairy_drinks}
            alt=""
          />
        </div>
        <div className={`col-4 ${styles.waterImg}`}>
          <img
            style={{ width: "94%", height: "16.5rem" }}
            className="shadow rounded-1"
            src={water}
            alt=""
          />
        </div>
      </Container>
    </Container>
  );
};

export default Categories;
