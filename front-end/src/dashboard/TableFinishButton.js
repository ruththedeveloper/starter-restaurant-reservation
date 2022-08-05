import React from "react";
import { useHistory } from "react-router";
import { unassignedTable } from "../utils/api";

function TableFinishButton({ status, table, loadDashboard }) {
  const history = useHistory();

  async function handleFinish(table_id, reservation_id) {
    await unassignedTable(table_id, reservation_id);
    await loadDashboard();
    history.push("/dashboard");
  }

  async function handleClick() {
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id, table.reservation_id)
      : null;
  }

  return (
    status === "Occupied" && (
      <button
        data-table-id-finish={table.table_id}
        type="button"
        className="btn btn-sm btn-primary"
        onClick={handleClick}
      >
        Finish
      </button>
    )
  );
}

export default TableFinishButton;
