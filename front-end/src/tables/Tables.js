import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Tables() {
  const history = useHistory();
  const [tableError, setTableError] = useState(null);
  const [tableForm, setTableForm] = useState({ table_name: "", capacity: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      tableForm.capacity = Number(tableForm.capacity);
      const response = await createTable(tableForm, abortController.signal);
      if (response) {
        history.push("/dashboard");
      }
    } catch (error) {
      setTableError(error);
    }

    return () => abortController.abort();
  }

  function handleChange(e) {
    setTableForm((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  ///// handleCancel function

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h2>Create Table</h2>
      <ErrorAlert error={tableError} />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Table Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Table Name"
              aria-label=""
              id="table_name"
              value={tableForm.table_name}
              onChange={handleChange}
              minLength={2}
              name="table_name"
              required
            />
          </div>
          <div className="col">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Capacity
            </label>

            <input
              type="number"
              className="form-control"
              id="capacity"
              value={tableForm.capacity}
              onChange={handleChange}
              placeholder="number of guests"
              aria-label=""
              name="capacity"
              required
              min="1"
            />
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
          <button
            className="btn btn-secondary me-md-2"
            type="button"
            onClick={handleCancel}
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

export default Tables;
