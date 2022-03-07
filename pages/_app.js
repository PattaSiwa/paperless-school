import "../styles/globals.css";
import {SchoolViewContextProvider} from "../src/context/selectSchoolContext";

function MyApp({Component, pageProps}) {
  return (
    <SchoolViewContextProvider>
      <Component {...pageProps} />
    </SchoolViewContextProvider>
  );
}

export default MyApp;
