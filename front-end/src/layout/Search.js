import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationTable from "./ReservationTable";
import ErrorAlert from "./ErrorAlert";

function Search() {
  const [reservations, setReservations] = useState([]);
  const [display, setDisplay] = useState(false);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(null);

  function changeHandler(e) {
    setMobile(e.target.value);
  }

  async function searchHandler(e) {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      const reservations = await listReservations(
        { mobile_number: mobile },
        abortController.signal
      );
      setReservations(reservations);
      setDisplay(true);
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  }

  return (
    <>
      <div className="d-flex justify-content-center pt-3">
        <h3>Search</h3>
      </div>
      <ErrorAlert error={error} />
      <div className="pt-3 pb-3">
        <form className="form-group" onSubmit={searchHandler}>
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Mobile Number:
          </label>

          <div className="input-group mb-3">
            <input
              name="mobile_number"
              id="mobile_number"
              type="text"
              className="form-control"
              placeholder="Enter a customer's phone number"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={mobile}
              onChange={changeHandler}
            />
            <button
              className="btn btn-outline-primary"
              type="submit"
              id="button-addon2"
            ><span className="oi oi-magnifying-glass"></span>
              Find
            </button>
          </div>
        </form>
      </div>
      {display && (
        <div>
          {reservations.length ? (
            <ReservationTable
              reservations={reservations}
              setReservations={setReservations}
              setError={setError}
            />
          ) : (
            <h3>No reservations found</h3>
          )}
        </div>
      )}
    </>
  );
}

export default Search;
