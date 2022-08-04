import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { previous, next } from "../utils/date-time";
import ReservationTable from "./ReservationTable";
import TableList from "./TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(reservations);

  //// handle dashboard buttons

  function handleToday() {
    history.push("/dashboard");
  }

  function handlePrevious() {
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>

      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary mr-1"
          onClick={handlePrevious}
        >
          {" "}
          <span className="oi oi-chevron-left"></span>Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary mr-1"
          onClick={handleToday}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary mr-1"
          onClick={handleNext}
        >
          Next <span className="oi oi-chevron-right"></span>
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <div className="row">
        <div className="col">
        <ReservationTable reservations={reservations} setReservations ={setReservations} setReservationsError={setReservationsError
        } />
        </div>

        <div className="col">
      <TableList tables={tables} loadDashboard={loadDashboard} /> </div>
      </div>
    </main>
  );
}

export default Dashboard;
