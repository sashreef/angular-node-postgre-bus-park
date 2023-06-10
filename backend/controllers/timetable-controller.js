const db = require("../db-config");

class TimetableController {

        async allTimetables(req, res) {
            const login = req.body.user;
            let allTimetables;
            try {
                allTimetables = await db(req.body.role).query(
                    `
                  SELECT
                    timetable.timetable_id,
                    timetable.departure_time,
                    timetable.arrival_time,
                    bus.bus_number,
                    bus.bus_brand
                  FROM
                    timetable
                    JOIN bus ON timetable.bus_id = bus.bus_id
                  ORDER BY timetable.timetable_id ASC

                ` );
            } catch (error) {
                console.error(error);
            }
            res.json(allTimetables.rows);
        }

    async addTimetable(req, res) {
        const { bus_id, departure_time, arrival_time } = req.body;
        try {
            await db(req.body.role).query(
                `insert into Timetable (bus_id, departure_time, arrival_time) values ($1, $2, $3)`,
                [bus_id, departure_time, arrival_time]
            );
        } catch (error) {
            console.log(error);
        }
        res.status(201).json();
    }

    async updateTimetable(req, res) {
        const { timetable_id, bus_id, departure_time, arrival_time } = req.body;
        try {
            await db(req.body.role).query(
                `UPDATE Timetable  SET bus_id = $2, departure_time = $3, arrival_time = $4, trip_id = $5
            WHERE timetable_id = $1`,
                [timetable_id, bus_id, departure_time, arrival_time]
            );
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Update error" });
        }
        res.status(201).json();
    }

}
module.exports = new TimetableController();