// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Alle Seiten auf HTTPS umleiten.
function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https

  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.all("*", checkHttps);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Die statischen Seiten in public und content werden als "statisch" definiert. So können Sie direkt adressiert werden.
app.use(express.static("public"));

// This is the basic-routing
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});
// Routing der index.html als /index
app.get("/index", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
