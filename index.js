require("dotenv").config();
const express = require("express");
const dbConnect = require("./dbConnect");
const foodRoutes = require("./routes/foods");
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", foodRoutes);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
