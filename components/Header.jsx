import styles from "./Header.module.css";
export function Header() {
  return (
    <header className={styles.header}>
      <h1>⚡ laverestrømregning.no ⚡</h1>
      <h2> Velkommen til en billigere hverdag</h2>
      <h3> La oss hjelpe deg å spare penger</h3>
    </header>
  );
}
