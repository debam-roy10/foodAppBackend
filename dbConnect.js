const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect("mongodb+srv://debamroy7:wBhYu6qPjSdolYZ2@testcluster.aaqdd.mongodb.net/?retryWrites=true&w=majority&appName=testCluster");

  mongoose.connection.on("connected", () => {
    console.log("Connected to database sucessfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database :" + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected");
  });
};

module.exports = dbConnect;
