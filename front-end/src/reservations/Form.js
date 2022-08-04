import React from "react";
import { useHistory } from "react-router-dom";

function  Form({ initialFormData, handleFormChange, handleSubmit }) {
  const history = useHistory();
  function handleCancel() {
    history.goBack();
  }

  return (
    initialFormData && (
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
                placeholder={initialFormData?.first_name || "First Name"}
                aria-label="First name"
                name="first_name"
                value={initialFormData?.first_name}
                onChange={handleFormChange}
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
                placeholder={initialFormData?.last_name || "Last Name"}
                aria-label="Last name"
                name="last_name"
                value={initialFormData?.last_name}
                onChange={handleFormChange}
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
                placeholder={initialFormData?.mobile || "Mobile Number"}
                aria-label="Mobile Number"
                name="mobile_number"
                value={initialFormData?.mobile_number}
                onChange={handleFormChange}
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
                value={initialFormData?.reservation_date}
                onChange={handleFormChange}
                required
                placeholder={initialFormData?.reservation_date || "YYYY-MM-DD"}
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
                placeholder={initialFormData?.reservation_time || "HH:MM"}
                pattern="[0-9]{2}:[0-9]{2}"
                aria-label=""
                name="reservation_time"
                value={initialFormData?.reservation_time}
                onChange={handleFormChange}
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
                placeholder={initialFormData?.people || "Number of Guests"}
                aria-label=""
                name="people"
                value={initialFormData?.people}
                onChange={handleFormChange}
                required
                min="1"
              />
            </div>
          </div>
        </div>

        <>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
            <button
              onClick={handleCancel}
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
    )
  );
}

export default Form;
