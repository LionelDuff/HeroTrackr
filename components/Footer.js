import styles from "@/styles/Footer.module.css";

import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Created by{" "}
        <Link href="https://www.lio-dev.fr" target="_blank">
          <span className={styles.color}>Lionel Dufour</span>
        </Link>
      </p>
    </div>
  );
}
