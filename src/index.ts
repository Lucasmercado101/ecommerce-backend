import Express from "express";

const PORT = process.env.PORT || 3000;

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
