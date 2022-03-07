import React, {useContext} from "react";
import Head from "next/head";

import styles from "../../styles/SchoolView.module.css";
import {SchoolViewTable} from "../../src/components/SchoolViewTable";

const SchoolView = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>View Page</title>
        <meta
          name="description"
          content="Assessment for Paperless Parts Frontend Role by Thay Siwapornchai"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <SchoolViewTable />
    </div>
  );
};

export default SchoolView;
