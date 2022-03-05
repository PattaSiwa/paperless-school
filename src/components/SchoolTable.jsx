import React, {useMemo} from "react";
import {COLUMNS} from "../dataset/columns";
import SCHOOL_DATA from "../dataset/ma_schools.json";
import {useTable} from "react-table";

const SchoolTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => SCHOOL_DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    tableInstance;

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <a href="/">
                    <button>See More</button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolTable;
