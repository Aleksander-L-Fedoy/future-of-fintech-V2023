import styles from "./Main.module.css";
import { useState } from "react";

export function Test() {
  const [message, setMessage] = useState("");

  const [updated, setUpdated] = useState(message);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    setUpdated(message);
  };

  return (
    <div className={styles.header}>
      <h1>Hello!</h1>
      <p>This is a React component.</p>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />

      <h2>Message: {message}</h2>

      <h2>Updated: {updated}</h2>

      <button onClick={handleClick}>Update</button>
      <p>{new Date().toLocaleString()}</p>
    </div>
  );
}
