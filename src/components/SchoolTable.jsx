import React, {useMemo, useContext} from "react";
import {COLUMNS} from "../dataset/columns";
import SCHOOL_DATA from "../dataset/ma_schools.json";
import {useTable, useSortBy} from "react-table";

import {useRouter} from "next/router";

import SchoolViewContext from "../context/selectSchoolContext";

const SchoolTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => SCHOOL_DATA, []);

  const schoolViewCnxt = useContext(SchoolViewContext);
  const router = useRouter();

  const handleSetSchool = schoolData => {
    const filteredSchool = SCHOOL_DATA.filter(
      school => school.INSTNM === schoolData.INSTNM
    );
    schoolViewCnxt.setSelectSchool(filteredSchool);
    router.push("/school");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    footerGroups,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => {
            const {key, ...headerGroups} = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroups}>
                {headerGroup.headers.map(column => {
                  if (column.Header === "Website") {
                    const {key, ...restColumn} = column.getHeaderProps();
                    return (
                      <th key={key} {...restColumn}>
                        {column.render("Header")}
                      </th>
                    );
                  } else {
                    const {key, ...restColumn} = column.getHeaderProps(
                      column.getSortByToggleProps()
                    );
                    return (
                      <th key={key} {...restColumn}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? "↑"
                              : "↓"
                            : ""}
                        </span>
                      </th>
                    );
                  }
                })}
                <th>More info</th>
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const {key, ...restRowProps} = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map(cell => {
                  const {key, ...restCellProps} = cell.getCellProps();

                  if (cell.column.Header === "Website") {
                    const url = cell.value
                      .replaceAll("https://", "")
                      .replaceAll("/", "");

                    return (
                      <td key={key} {...restCellProps}>
                        <a href={`http://` + url} target="_blank">
                          <button>Visit School Site</button>
                        </a>
                      </td>
                    );
                  } else {
                    return (
                      <td key={key} {...restCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                })}
                <td>
                  <button onClick={() => handleSetSchool(row.values)}>
                    See More
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => {
            const {key, ...restFootProps} = footerGroup.getFooterGroupProps();
            return (
              <tr key={key} {...restFootProps}>
                {footerGroup.headers.map(column => {
                  const {key, ...restFooterCellProps} = column.getFooterProps();
                  return (
                    <td key={key} {...restFooterCellProps}>
                      {column.render("Footer")}
                    </td>
                  );
                })}
                <td>More Info</td>
              </tr>
            );
          })}
        </tfoot>
      </table>
    </div>
  );
};

export default SchoolTable;
