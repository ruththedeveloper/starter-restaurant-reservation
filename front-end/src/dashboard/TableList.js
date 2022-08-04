import React from "react";
import TableFinishButton from "./TableFinishButton";

function TableList({ tables, loadDashboard }) {
  if (!tables) {
    return null;
  }





  const tablesInfo = tables.map((table) => {

    // display free or occupied if the reservation is seated 
 const  status = table.reservation_id? "Occupied":"Free";
    return (
      <tr key={table.table_id}>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {status}
        </td>
        <td>
        <TableFinishButton status={status}  table={table} loadDashboard={loadDashboard}/>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h3>TableList</h3>
      <table className=" table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>{tablesInfo}</tbody>
      </table>
    </div>
  );
}

export default TableList;
