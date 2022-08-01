import React from "react";
//import {Link }from "react-router-dom"
//import { cancelReservation } from "../utils/api";
//import { useHistory } from "react-router-dom";

function ReservationTable({
  reservations,
  setReservationsError,
  setReservations,
}) {
  // const history = useHistory();
  if (!reservations) {
    return null;
  }

  // function handleCancel() {
  //   console.log("cancelled");
  // }


  const reservationEl = reservations?.map((reservation) => {
     
  const { reservation_id} = reservation;

    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>
        {reservation.first_name} {reservation.last_name}
        </td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation_id}>{reservation.status}</td>
        {reservation.status !== 'seated' &&
        (<>
        <td>
          <a
            className="btn btn-secondary"
            href={`/reservations/${reservation_id}/seat`}
          >
            Seat
          </a>
        </td>
        <td>
          <button
            className="btn btn-secondary"
            href={`/reservations/${reservation_id}/edit`}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            data-reservation-id-cancel={reservation_id}
            // onClick={handleCancel}
          >
            Cancel
          </button>
        </td>
        </>)
       }
      </tr>
    );
  });

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col">DATE</th>
            <th scope="col">TIME</th>
            <th scope="col">PEOPLE</th>
            <th scope="col">STATUS</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{reservationEl}</tbody>
      </table>
    </div>
  );
}

export default ReservationTable;
