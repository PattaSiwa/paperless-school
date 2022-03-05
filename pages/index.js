import Head from "next/head";
import Image from "next/image";
import SchoolTable from "../src/components/SchoolTable";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Paperless Parts Assessment</title>
        <meta
          name="description"
          content="Assessment for Paperless Parts Frontend Role by Thay Siwapornchai"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.svg" width={300} height={100} />
        <h1>Massachusetts School Assessment</h1>
        <h5>By Thay Siwapornchai</h5>
        <SchoolTable />
      </main>

      <footer className={styles.footer}>
        <h4>Powered by Thay Siwapornchai</h4>
      </footer>
    </div>
  );
}
