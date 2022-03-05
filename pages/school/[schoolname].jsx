import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";

import {useRouter} from "next/router";

import styles from "../../styles/SchoolView.module.css";
import SCHOOLS_DATA from "../../src/dataset/ma_schools.json";
import PROGRAMS from "../../src/dataset/programs.json";

const SchoolView = () => {
  const router = useRouter();

  console.log(PROGRAMS);

  const [school, setSchool] = useState({
    ADM_RATE: "0",
    CITY: "",
    INSTNM: "",
    PROGRAMS: [],
    INSTURL: "",
    SAT_AVG: "",
  });

  useEffect(() => {
    const query = router.query;
    const url = query.schoolname;

    const filteredSchool = SCHOOLS_DATA.filter(
      school => school.INSTURL === url
    );

    setSchool(...filteredSchool);
  }, [router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{school.INSTNM}</title>
        <meta
          name="description"
          content="Assessment for Paperless Parts Frontend Role by Thay Siwapornchai"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.header}>
        <h1 className={styles.headerText}>{school.INSTNM}</h1>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/">
          <button className={styles.button}>Back to School List</button>
        </Link>
      </div>
      <div className={styles.main}>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Acceptace Rate</th>
              <th>Average SAT Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.row}>
              <td>{school.CITY}</td>

              <td>{school.ADM_RATE !== "NULL" ? school.ADM_RATE : "N/A"}</td>
              <td>{school.SAT_AVG !== "NULL" ? school.SAT_AVG : "N/A"}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.courses}>
          <table>
            <thead>
              <tr>
                <th>Courses Offered</th>
              </tr>
            </thead>
            <tbody>
              {school.PROGRAMS.map(course, index => (
                <tr key={index}>
                  <td>{PROGRAMS[course]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolView;
