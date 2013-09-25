var request = require("request");

module.exports = {
  baseUrl: "http://www.redfin.com/homes-for-sale?search_location=",

  locateProperty: function (address, cb) {
    request(this.baseUrl+address, function(error, response, body){
      cb(body);
    });
  }
}
