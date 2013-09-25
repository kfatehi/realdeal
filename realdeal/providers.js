var phantom = require('phantom');
var phantomDriver = function (url, script) {
  resource_count = 0;
  console.log("hitting "+url);
  phantom.create(function (ph) {
    ph.createPage(function(page) {
      page.set('onResourceRequested', function() {
        console.log("Resource requested");
        resource_count++;
      });
      page.set('onResourceReceived', function() {
        console.log("Resource received");
        resource_count--;
      });
      setTimeout(function() {
        while(true) {
          if (resource_count > 0) {
            console.log("still "+resource_count+" resources pending...")
          } else {
            script(page)
          }
        }
      }, 1000);
      page.open(url, function(status) {
        console.log("opened page", status);
      });
    });
  });
}

var providers = {}


providers.redfin = {
  baseUrl: "http://www.redfin.com/homes-for-sale?search_location=",

  locateProperty: function (address, cb) {
    url = this.baseUrl+address
    phantomDriver(url, function(page){
      page.evaluate((function() {
        return document.body.innerText;
      }), function(result) {
        cb(result);
      });
    })
  }
}

providers.themls = {
  baseUrl: "http://guests.themls.com/Listings.aspx",

  locateProperty: function (address, cb) {
    url = this.baseUrl
    phantomDriver(url, function(page){
      page.evaluate((function() {
        $('#txtSearchBox').val(address);
        $('#btnSearch').click();
        return "hi";
      }), function(result) {
        cb(result);
      });
    })
  }
}

module.exports = providers
