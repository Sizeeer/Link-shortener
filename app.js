const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/api.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

const PORT = config.get("port") || 5000;

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log("start");
    });
  } catch (e) {
    console.log(e.messages);
  }
}

start();
