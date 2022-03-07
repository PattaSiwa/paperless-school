import React, {useContext} from "react";
import PROGRAMS from "../dataset/programs.json";
import SchoolViewContext from "../context/selectSchoolContext";
import styles from "../../styles/SchoolViewTable.module.css";

import Link from "next/link";

export const SchoolViewTable = () => {
  const schoolViewContext = useContext(SchoolViewContext);

  const schoolData = {
    CITY: "",
    STABBR: "",
    ADM_RATE: "",
    ZIP: "",
    HIGHDEG: "",
    SAT_AVG: "",
    LONGITUDE: "",
    LATITUDE: "",
    CCSIZSET: "",
    INSTNM: "",
    PROGRAMS: [],
    INSTURL: "",
  };

  if (schoolViewContext.schoolData) {
    schoolData = schoolViewContext.schoolData[0];
  }

  if (!schoolData.INSTNM) {
    return (
      <div className={styles.center}>
        <div className={styles.buttonContainer}>
          <Link href="/">
            <button className={styles.button}>Back to School List</button>
          </Link>
          <h1>Please go back and select a school</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.headerText}>{schoolData.INSTNM}</h1>
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
              <td>{schoolData.CITY}</td>

              <td>
                {schoolData.ADM_RATE !== "NULL"
                  ? `${(schoolData.ADM_RATE * 100).toFixed(2)}%`
                  : "N/A"}
              </td>
              <td>
                {schoolData.SAT_AVG !== "NULL" ? schoolData.SAT_AVG : "N/A"}
              </td>
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
              {schoolData.PROGRAMS &&
                schoolData.PROGRAMS.map(course => (
                  <tr key={course}>
                    <td>{PROGRAMS[course]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
