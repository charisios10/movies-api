const express = require("express");
const app = express();

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
