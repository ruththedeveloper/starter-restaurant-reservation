import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import { isInTheFuture } from "../utils/date-time";
import { isNotOnTuesday } from "../utils/date-time";

function NewReservations() {
  let history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);

  const findErrors = (date, errors) => {
    isNotOnTuesday(date, errors);
    isInTheFuture(date, errors);
  };


  async function createNewReservation(formData) {
    const abortController = new AbortController();
    const errors = [];

    findErrors(formData.reservation_date, errors);

    if (errors.length) {
      setReservationsError({ message: errors });
      return;
    }

    try {
      formData.people = Number(formData.people);
      await createReservation(formData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationsError(error);
    }

    return () => abortController.abort();
  }

  return (
    <div>
      <h1> Create Reservation</h1>
      <ErrorAlert error={reservationsError} />
      <ReservationForm submitForm={createNewReservation} />
    </div>
  );
}

export default NewReservations;
