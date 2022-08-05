const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

///validate fields

const VALID_TABLE_FIELDS = ["table_name", "capacity"];

function tableIsValid(req, res, next) {
  const table = req.body.data;
  console.log(table);

  if (!table) {
    return next({ status: 400, message: "Must have data property" });
  }
  VALID_TABLE_FIELDS.forEach((field) => {
    if (!table[field]) {
      return next({ status: 400, message: `Must have ${field}property.` });
    }
  });
  if (typeof table["capacity"] !== "number") {
    return next({
      status: 400,
      message: "capacity must be a number  greater than 0",
    });
  }
  if (table["table_name"].length < 2) {
    return next({
      status: 400,
      message: "table_name must be at least 2 caracters",
    });
  }
  next();
}

////// CRUD

async function list(req, res, next) {
  const table = await service.list();
  res.json({ data: table });
}

async function create(req, res, next) {
  const table = req.body.data;
  const newTable = await service.create(table);
  table.reservation_id = newTable.reservation_id;
  table.table_id = newTable.table_id;
  res.status(201).json({ data: table });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [tableIsValid, asyncErrorBoundary(create)],
  tableIsValid,
};
