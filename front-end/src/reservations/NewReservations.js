import React, { useState } from "react";
import Form from "./Form";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import { isNotOnTuesday } from "../utils/date-time";
import { isInTheFuture } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservations() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  

  const findErrors = (date, errors) => {
    isNotOnTuesday(date, errors);
    isInTheFuture(date, errors);
  };

  async function handleSubmit( event) {
    event.preventDefault();
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
      <ErrorAlert className="alert alert-danger" error={reservationsError} />
      <Form
        initialFormData={formData}
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
      />
    </div>
  );
}

export default NewReservations;
