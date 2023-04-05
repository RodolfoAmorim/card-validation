import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import styles from "./App.module.css";
import "./Global.css";

import LogoVisa from "../public/visa.svg";
import ReactInputMask from "react-input-mask";

const cardDataSchema = zod.object({
  cardNumber: zod.string(),
  name: zod.string(),
  validity: zod.string(),
  cvv: zod.string()
});

export function App() {
  const { register, watch } = useForm({
    defaultValues: {
      cardNumber: "",
      name: "",
      validity: "",
      cvv: ""
    },
  });

  // Set Card Image Infos
  const [cardValue, setCardValue] = useState("**** **** **** ****");
  const [cardName, setCardName] = useState("Seu nome aqui");
  const [cardValidity, setCardValidity] = useState("**/**");
  const [cardCvv, setCardCvv] = useState("***");
  const [cardCvvFocus, setCardCvvFocus] = useState(false);

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = e.target.value;
    setCardValue(numberValue);

    if (!numberValue) {
      setCardValue("**** **** **** ****");
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setCardName(nameValue);

    if (!nameValue) {
      setCardName("Seu nome aqui");
    }
  };

  const handleChangeValidity = (e: ChangeEvent<HTMLInputElement>) => {
    const validityValue = e.target.value;
    setCardValidity(validityValue);

    if (!validityValue) {
      setCardValidity("**/**");
    }
  };

  const handleChangeCvv = (e: ChangeEvent<HTMLInputElement>) => {
    const cardCvv = e.target.value;

    setCardCvv(cardCvv);

    if (!cardCvv) {
      setCardCvv("***");
    }
  };
  
  const handleCvvOnFocus = () => {
    setCardCvvFocus(true)
  }

  const handleCvvOnBlur = () => {
    setCardCvvFocus(false)
  }

  const cvvOnFocus = cardCvvFocus ? styles.flip : '';

  return (
    <form action="" className={styles.form}>
      <div className={`${styles.cardContainer} ${cvvOnFocus}`}>
        <div className={styles.cardInner}>
          <div className={`${styles.creditCard} ${styles.cardFront}`}>
            <span className={styles.cardLogo}>
              <img src={LogoVisa} />
            </span>

            <div className={styles.cardUserInfos}>
              <p className={styles.cardNumber}>{cardValue}</p>
              <span className={styles.cardName}>
                <small>Titular do Cartão</small>
                {cardName}
              </span>
              <span className={styles.cardValidity}>
                <small>Validade</small>
                {cardValidity}
              </span>
            </div>
          </div>

          <div className={`${styles.creditCard} ${styles.cardBack}`}>
            <div className={styles.cardUserInfos}>
              <span className={styles.cardCvv}>
                <small>CVV</small>
                {cardCvv}
              </span>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.cardInfos}>
        <div>
          <label htmlFor="cardNumber">Número do Cartão</label>
          <ReactInputMask
            mask="9999 9999 9999 9999"
            maskChar=""
            type="text"
            id="cardNumber"
            placeholder="**** **** **** ****"
            {...register("cardNumber")}
            value={cardValue}
            onChange={handleChangeNumber}
          />
        </div>

        <div>
          <label htmlFor="nome">Nome do Titular</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome como está no cartão"
            onChange={handleChangeName}
          />
        </div>

        <div>
          <label htmlFor="validity">Validade</label>
          <ReactInputMask
            mask="99/99"
            maskChar=""
            type="text"
            id="validity"
            placeholder="mm/aa"
            {...register("validity")}
            onChange={handleChangeValidity}
          />
        </div>

        <div>
          <label htmlFor="cvv">CVV</label>
          <ReactInputMask
            mask="999"
            maskChar=""
            type="text"
            id="cvv"
            placeholder="***"
            maxLength={3}
            {...register("cvv")}
            onChange={handleChangeCvv}
            onFocus={handleCvvOnFocus}
            onBlur={handleCvvOnBlur}
          />
        </div>
      </div>

      <button>Adicionar Cartão</button>
    </form>
  );
}
