const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlabars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Michela Carnevale",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Michela Carnevale",
  });
});
app.get("/weather", (req, res) => {
  let address = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: "Please enter address",
    });
  }
  geocode(address, (error, { latitude, longitude, position } = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        position,
        address: req.query.address,
      });
    });
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Michela Carnevale",
    helpText: "This is some helpful text",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Michela Carnevale",
    errorText: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Michela Carnevale",
    errorText: "Page not found",
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
