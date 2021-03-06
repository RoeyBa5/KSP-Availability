const express = require("express");
const path = require("path");

const app = express();

//Init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API running"));

// Define Route
app.use("/api/ksp", require("./routes/api/ksp"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
