const express = require("express");
const port = 3000;
const app = express();
const notesRouter = require("./routes/notesRoute");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/notes",notesRouter);

//for any other endpoint that has not been created is hit
app.use((req, res, next) => {
  res.status(404).json({ error: "Page Not Found" });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // for debugging
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port,()=>{
    console.log("Listening");
})