//const { listReservations } = require("../../../front-end/src/utils/api");
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */
//validations middlewares

const VALID_RESERVATIONS_BODY = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function _validateTime(str) {
  const [hour, minute] = str.split(":");
  if (hour.length > 2 || minute.length > 2) {
    return false;
  }
  if (hour < 1 || hour > 23) {
    return false;
  }
  if (minute < 0 || minute > 59) {
    return false;
  }

  return true;
}

/////////

function isValidReservation(req, res, next) {
  const reservation = req.body.data;


  if (!reservation) {
    return next({ status: 400, message: `Must have data property.` });
  }
  ////////////

  VALID_RESERVATIONS_BODY.forEach((field) => {
   
    if (!reservation[field]) {
      return next({ status: 400, message: `${field} field required` });
    }

    if (field === "people" && typeof reservation[field] !== "number") {
      return next({
        status: 400,
        message: `${reservation[field]} is not a number type for people field.`,
      });
    }
    if (field === "reservation_date" && !Date.parse(reservation[field])) {
      return next({ status: 400, message: `${field} is not a valid date.` });
    }

    if (field === "reservation_time") {
      if (!_validateTime(reservation[field])) {
        return next({ status: 400, message: `${field} is not a valid time` });
      }
    }
  });
  next();
}

/// if reservation exist
async function reservationExist(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation_id ${reservation_id} does not exist.`,
  });
}

/// create reservation
async function create(req, res) {
  // const reservation = req.body.data;

  // const { reservation_id } = await service.create(reservation);

  // reservation.reservation_id = reservation_id;
  // res.status(201).json({ data: reservation });{}

  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = {},
  } = req.body;

  const newRerservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };
  // console.log(!`it worked`);
  const response = await service.create(newRerservation);
  res.status(201).json({ data: newRerservation });
}

///
async function read(req, res) {
  const reservation = req.locals.reservation;
  res.json({ data: reservation });
}

async function list(req, res) {
  const { date } = req.query;
  let reservations;
  if (date) {
    reservations = await service.listByReservationDate(date);
  } else {
    reservations = await service.list();
  }
  res.json({ data: reservations });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(isValidReservation),asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExist), asyncErrorBoundary(read)],
};