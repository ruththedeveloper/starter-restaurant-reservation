import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ submitForm }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  const history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitForm(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="row">
          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              First Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              name="first_name"
              value={formData?.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Last Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              name="last_name"
              value={formData?.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Mobile Number
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              name="mobile_number"
              value={formData?.mobile_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Date
            </label>

            <input
              type="date"
              className="form-control"
              aria-label="date"
              name="reservation_date"
              value={formData?.reservation_date}
              onChange={handleChange}
              required
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
            />
          </div>
          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Time
            </label>

            <input
              type="time"
              className="form-control"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              aria-label=""
              name="reservation_time"
              value={formData?.reservation_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              People
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="Number of people"
              aria-label=""
              name="people"
              value={formData?.people}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>
      </div>

      <>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
          <button
            onClick={() => history.goBack()}
            className="btn btn-secondary me-md-2"
            type="button"
          >
            <span className="oi oi-x"></span>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            {" "}
            <span className="oi oi-check"></span>
            Submit
          </button>
        </div>
      </>
    </form>
  );
}

export default ReservationForm;
