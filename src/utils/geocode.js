const request = require("request");
const geocode = (address, callback) => {
    const url =
      "http://api.positionstack.com/v1/forward?access_key=6487c66f8af5b7865636ff6ad7d61f83&query=" +address;
  
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to location services!", undefined);
      } else if (body.length === 0 || body.data === undefined) {
        callback("Unable to find location, try another search!", undefined);
      } else{
        callback(undefined,{
          latitude: body.data[0].latitude,
          longitude: body.data[0].longitude,
          position: body.data[0].label
        })
      }
    });
  };

  module.exports = geocode;