import {createContext, useState} from "react";

const SchoolViewContext = createContext({
  schoolData: {
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
  },
  setSelectSchool: function (schoolData) {},
});

export const SchoolViewContextProvider = props => {
  const [selectedSchool, setSelectedSchool] = useState();

  const setSelectSchoolHandler = schoolData => {
    setSelectedSchool(schoolData);
  };

  const context = {
    schoolData: selectedSchool,
    setSelectSchool: setSelectSchoolHandler,
  };

  return (
    <SchoolViewContext.Provider value={context}>
      {props.children}
    </SchoolViewContext.Provider>
  );
};

export default SchoolViewContext;
