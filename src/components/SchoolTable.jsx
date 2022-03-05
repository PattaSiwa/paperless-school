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
          {headerGroups.map(headerGroup => {
            const {key, ...headerGroups} = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroups}>
                {headerGroup.headers.map(column => {
                  const {key, ...restColumn} = column.getHeaderProps();
                  if (column.Header === "Website") {
                    return (
                      <th key={key} {...restColumn}>
                        {column.render("Header")}
                      </th>
                    );
                  } else {
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
                    return (
                      <td key={key} {...restCellProps}>
                        <a href={cell.value} target="_blank">
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
