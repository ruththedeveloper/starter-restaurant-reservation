 const  { select} = require("../db/connection");
 const knex =require("../db/connection");


  function list(){
    return knex("reservations").select("*").orderBy("reservations.reservation_date")
  };

   function create(reservation){
    return knex("reservations as r").insert(reservation).returning("*").then((NewReservation)=>NewReservation[0])
   };

   function read(reservation_id){
    return knex("reservations").select("*").where({reservation_id}).first();
   };

    function listByReservationDate(reservation_date){
       return knex("reservations").select("*").where({reservation_date}).orderBy("reservation_time");
    };

   module.exports ={ list,create,read,listByReservationDate};