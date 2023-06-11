const express = require("express");
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(credentials);
app.use(cors(corsOptions));

require('./scheduler');
app.use(express.json());
app.use(cookieParser());

app.use("/public", require("./routes/public-routes"));
app.use("/user", require("./routes/auth-routes"));
app.use(verifyJWT);
app.use("/trip", require("./routes/trip-routes"));
app.use("/booking", require("./routes/booking-routes"));
app.use("/user_config", require("./routes/user-routes"));
app.use("/ticket", require("./routes/ticket-routes"));
app.use("/bus", require("./routes/bus-routes"));
app.use("/timetable", require("./routes/timetable-routes"));
app.use("/driver", require("./routes/driver-routes"));
app.use("/journey", require("./routes/journey-routes"));
app.use("/statistics", require("./routes/statistics-routes"));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
