import React, {useMemo} from "react";
import {COLUMNS} from "../dataset/columns";
import SCHOOL_DATA from "../dataset/ma_schools.json";
import Link from "next/link";
import {useTable, useSortBy, useGlobalFilter} from "react-table";

const SchoolTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => SCHOOL_DATA, []);

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
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                if (column.Header === "Website") {
                  return (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  );
                } else {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  if (cell.column.Header === "Website") {
                    return (
                      <td {...cell.getCellProps()}>
                        <a href={cell.value} target="_blank">
                          <button>Visit School Site</button>
                        </a>
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
                <td>
                  <Link href={"/school/" + row.allCells[2].value}>
                    <a>
                      <button>See More</button>
                    </a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
              <td>More Info</td>
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default SchoolTable;
