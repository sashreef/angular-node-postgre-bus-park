const db = require("../db-config");


class MainPageController{

    async getAllTrips(req, res) {
    const allTrips = await db("connect_user").query(
      `select * from trip order by trip_id`
    );
    res.json(allTrips);
   }
   async getAllJourneys(req, res) {
    const allJourneys = await db("connect_user").query(
      `select * from journey order by journey_id`
    );
    res.json(allJourneys);
   }





}