import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ListHeroes from "@/components/ListHeroes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>HeroTrackr</title>
        <meta
          name="description"
          content="HeroTrackr — Explore the legends, one hero at a time."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        <div className={styles.opacity}>
          <main className={styles.main}>
            <div className={styles.containerHeader}>
              <Header />
            </div>

            <div className={styles.description}>
              <h2 className={styles.desc1}>
                Get Your Cape On and Explore the Superhero Universe
              </h2>
              <h3 className={styles.desc2}>
                From super strength to mind control{" "}
                <span className={styles.color}>—</span> dive in and geek out!
              </h3>
            </div>
            <div className={styles.containerHeroes}>
              <ListHeroes />
            </div>
            <footer className={styles.containerFooter}>
              <Footer />
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
