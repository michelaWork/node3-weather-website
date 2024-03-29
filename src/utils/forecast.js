const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b09ed3c931afdf5e70691acd36ab323c&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out and it feels like " +
          body.current.feelslike +
          " degress out." +
          "The humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
