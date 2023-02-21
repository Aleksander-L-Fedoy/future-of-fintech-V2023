import styles from "./Main.module.css";
import { useState } from "react";

export function StromKalkulator() {
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");

  const [updated, setUpdated] = useState("");

  const handleChange1 = (event) => {
    setMessage1(event.target.value);
  };

  const handleChange2 = (event) => {
    setMessage2(event.target.value);
  };

  const handleClick = () => {
    if (!message1 && !message2) {
      setUpdated("Fyll inn begge feltene");
    } else {
      // 👇 Calculate the result
      const pengerSpart = parseInt(message2) * 0.2;
      setUpdated(`Du kan spare ${pengerSpart.toFixed(2)} kroner!`);
    }
  };

  return (
    <div className={styles.header}>
      <h1>Prøv vår strømkalkulator!</h1>
      <p>
        Prøv vår strømkalkulator og se hvor mye du kan spare i strøm hver måned
      </p>
      <p>Hvor stor bolig har du? (kvm)</p>
      <input
        type="number"
        id="størrelseBolig"
        name="størrelseBolig"
        onChange={handleChange1}
        value={message1}
      />
      <p>Hvor mye betalte du forrige måned? (kr)</p>
      <input
        type="number"
        id="strømRegning"
        name="strømRegning"
        onChange={handleChange2}
        value={message2}
      />
      <p></p>
      <button onClick={handleClick}>Regn ut</button>
      <h2>{updated}</h2>
    </div>
  );
}
