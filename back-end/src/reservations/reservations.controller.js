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

// time validation

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

///////// verify each field

function isValidReservation(req, res, next) {
  const reservation = req.body.data;

  if (!reservation) {
    return next({ status: 400, message: `Must have data property.` });
  }
  //////////// validate reservation field

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

//// RESERVATIONS  ONLY DURING WORKING DAYS

function isNotOnTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const { year, month, day } = reservation_date.split("-");
  const date = new Date(`${month} ${day}, ${year}`);
  res.locals.date = date;
  if (date.getDay() === 2) {
    return next({ status: 400, message: "Location is closed on  Tuesdays" });
  }
  next();
}

function isInTheFuture(req, res, next) {
  const date = res.locals.date;
  const today = new Date();
  if (date < today) {
    return next({ status: 400, message: "Must be a future date " });
  }
  next();
}

function isWithinOpenHours(req, res, next) {
  const reservation = req.body.data;
  const [hour, minute] = reservation.reservation_time.split(":");
  if (hour < 10 || hour > 21) {
    next({
      status: 400,
      message: "Reservations must be made within business hours",
    });
  }
  if ((hour < 11 && minute < 30) || (hour > 20 && minute > 30)) {
    next({
      satatus: 400,
      message: "Reservation must be made within business hours",
    });
  }
  next();
}

function hasBookedStatus(req, res, next) {
  const { status } = res.locals.reservation
    ? res.locals.reservation
    : req.body.data;
  if (status === "seated" || status === "finished" || status === "cancelled") {
    return next({
      status: 400,
      message: ` New reservation  can not have ${status} status`,
    });
  }
  next();
}

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

function isValidStatus(req, res, next) {
  const VALID_STATUSES = ["booked", "seated", "finished", "cancelled"];
  const { status } = req.body.data;
  if (!VALID_STATUSES.includes(status)) {
    return next({ status: 400, message: "status unknown." });
  }
  next();
}

function isAlreadyFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: "a finished reservation cannot be updated.",
    });
  }
  next();
}

/// if reservation exist

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

/// create reservation
async function create(req, res) {
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
  //  console.log(!`it worked`);
  const response = await service.create(newRerservation);
  // console.log(response);
  res.status(201).json({ data: response });
}

async function read(req, res) {
  const reservation = res.locals.reservation;
  res.json({ data: reservation });
}

async function update(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  const reservation = await service.update(reservation_id, status);
  res.json({ data: {status}});
}

async function modify(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = req.body.data;
  const data = await service.modify(reservation_id, reservation);
  reservation.reservation_id = data.reservation_id;
  res.json({ data: reservation });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    asyncErrorBoundary(isValidReservation),
    isNotOnTuesday,
    isInTheFuture,
    isWithinOpenHours,
    hasBookedStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExist), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExist),
    isValidStatus,
    isAlreadyFinished,
    asyncErrorBoundary(update),
  ],
  modify: [
    isValidReservation,
    isNotOnTuesday,
    isInTheFuture,
    isWithinOpenHours,
    asyncErrorBoundary(reservationExist),
    hasBookedStatus,
    asyncErrorBoundary(modify),
  ],
};
