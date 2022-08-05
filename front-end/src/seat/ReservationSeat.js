import React, { useState, useEffect } from "react";
import { getReservation, listTables, updateTable } from "../utils/api";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";

function ReservationSeat() {
  const [reservation, setReservation] = useState({});
  const [tableList, setTableList] = useState([]);
  const { reservation_id } = useParams();
  const [seatError, setSeatError] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      listTables(abortController.signal)
        .then((response) => setTableList(response))
        .catch((error) => {
          setSeatError(error);
        });
      getReservation(reservation_id, abortController.signal)
        .then((response) => setReservation(response))
        .catch((error) => setSeatError(error));
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservation_id]);

  function selectTable(e) {
    e.preventDefault();
    setSelectedTable(e.target.value);
  }
  async function handleSubmit(e) {
    const abortController = new AbortController();
    e.preventDefault();

    try {
      await updateTable(selectedTable, reservation_id, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      setSeatError(error);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <h2>Seat reservation</h2>

      <ErrorAlert className="alert alert-danger" error={seatError} />
      <h3>{`# ${reservation?.reservation_id} - ${reservation?.first_name} ${reservation?.last_name} on ${reservation?.reservation_date} at ${reservation?.reservation_time} for ${reservation?.people}`}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="formGroupExampleInput2" className="form-label">
          {" "}
          Seat at:
        </label>
        <select
          id="table_id"
          name="table_id"
          className="form-select"
          aria-label="Default select example"
          value={selectedTable}
          onChange={selectTable}
        >
          <option value="">Select a table</option>
          {tableList.map((table) => {
            return (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            );
          })}
        </select>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
          <button
            className="btn btn-secondary me-md-2"
            type="button"
            onClick={() => history.goBack()}
          >
            {" "}
            <span className="oi oi-x"></span>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
             <span className="oi oi-check"></span> 
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationSeat;
