import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Created by <span className={styles.color}>Lionel Dufour</span>
      </p>
    </div>
  );
}
