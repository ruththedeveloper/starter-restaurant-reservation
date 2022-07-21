import React from "react";

function ReservationTable({ reservations }) {
  console.log(reservations);

  const reservationEl = reservations?.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        {" "}
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name } { reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td>{reservation.status}</td>
        <td>
          {" "}
          <a class="btn btn-secondary" href="#" role="button">
            Seat
          </a>
        </td>
        <td>
          {" "}
          <a class="btn btn-secondary" href="#" role="button">
            Edit
          </a>
        </td>
        <td>
          {" "}
          <a class="btn btn-secondary" href="#" role="button">
            Cancel
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table class="table">
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
