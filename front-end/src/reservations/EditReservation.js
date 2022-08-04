import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { findReservation, modifyReservation } from "../utils/api";
import { isNotOnTuesday, isInTheFuture } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./Form";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [error, setError] = useState(null);
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      try {
        const reservation = await findReservation(
          reservation_id,
          abortController.signal
        );
        setReservationData(reservation);
      } catch (error) {
        setError(error);
      }
      return () => abortController.abort();
    }
    loadReservation();
  }, [reservation_id]);

  const findErrors = (res, errors) => {
    isNotOnTuesday(res.reservation_date, errors);
    isInTheFuture(res.reservation_date, errors);
    if (res.status && res.status !== "booked") {
      errors.push(
        <li key="not booked">Reservation can no longer be changed</li>
      );
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    const errors = [];
    findErrors(reservationData, errors);
    if (errors.length) {
      setError({ message: errors });
      return;
    }
    try {
      reservationData.people = Number(reservationData.people);
      await modifyReservation(
        reservation_id,
        reservationData,
        abortController.signal
      );
      history.push(`/dashboard?date=${reservationData.reservation_date}`);
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  }

  const handleFormChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <ErrorAlert error={error} />
      <h3> Edit Reservation   # {reservation_id}</h3>
      <Form
        initialFormData={reservationData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default EditReservation;
