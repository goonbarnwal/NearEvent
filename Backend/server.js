const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/registrations", registrationRoutes);

app.use("/api/admin", adminRoutes);


// Test Route
app.get("/", (req, res) => {

    res.send("NearEvent Backend Running");

});



const PORT = process.env.PORT || 5000;



// MongoDB Connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => {

    console.log("MongoDB Connected");


    // Start Scheduler after MongoDB connection
    require("./jobs/eventScheduler");


    app.listen(PORT, () => {

        console.log(
            `Server running on port ${PORT}`
        );

    });


})
.catch((error) => {


    console.log(
        "MongoDB Connection Error:",
        error.message
    );


});