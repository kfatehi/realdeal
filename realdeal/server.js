/**
 * Simple MongoDB-based backend containers server.
 */

var
  // Mongoose
  mongoose = require("mongoose"),
  MONGO_ADDR = process.env.MONGO_ADDR || "127.0.0.1",
  MONGO_PORT = parseInt(process.env.MONGO_PORT || 27017, 10),
  Container = {},

  // Express.
  express = require("express"),
  app = express(),
  ADDR = process.env.ADDR || "127.0.0.1",
  PORT = parseInt(process.env.PORT || 4321, 10);

// -----------------------
// Containers Model
// -----------------------
Container.Schema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    "default": ""
  },
  text: {
    type: String,
    trim: true,
    "default": "*Edit your container!*"
  },
  createdAt: {
    type: Date,
    "default": new Date()
  }
}, {
  // Remove extra `id` attribute so we can make virtual.
  // See: https://github.com/LearnBoost/mongoose/issues/1137
  id: false,

  // Add virtual fields to data here.
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

Container.Schema.virtual("id").get(function () {
  return this.get("_id");
});

Container.Model = mongoose.model("Container", Container.Schema);

// -----------------------
// Application helpers
// -----------------------
// Generic results handler.
function _handler(res, status) {
  return function (err, results) {
    if (err) {
      return res.json({ err: err.toString() }, 500);
    }

    // Translate to JSON.
    if (Array.isArray(results)) {
      results = results.map(function (m) {
        return m.toJSON();
      });
    } else {
      results = results.toJSON();
    }

    res.set("cache-control", "no-cache");
    res.json(results, status || 200);
  };
}

// Log requests.
function _logRequest(req, res, next) {
  console.log([
    req.method,
    req.url,
    JSON.stringify(req.body)
  ].join(" "));

  return next();
}

// -----------------------
// Application server
// -----------------------
// Connect to MongoDB.
mongoose.connect("mongodb://" + MONGO_ADDR + ":" +
                 MONGO_PORT + "/test");

// Ignore favicon.
app.use(function (req, res, next) {
  if (req.url !== "/favicon.ico") { return next(); }
  res.set({"Content-Type": "image/x-icon"});
  res.send(200);
});

// Configurations and static server.
app.use(express.bodyParser());
app.use("/", express.static(__dirname + "/app"));
app.use("/test", express.static(__dirname + "/test"));
app.use(_logRequest);

// REST API
// Containers Collection
app.get("/api/containers", function (req, res) {     // (R)ead
  Container.Model.find({}, _handler(res));
});

provider = require('./providers').themls;

// Container Model
app.post("/api/containers", function (req, res) {    // (C)reate
  provider.locateProperty(req.body.title, function(result){
    if (result === false)
      res.send(422, { error: "Property not found." }); 
    else {
      req.body.text = result;
      Container.Model.create(req.body, _handler(res, 201));
    }
  });
});
app.put("/api/containers/:id", function (req, res) { // (U)pdate
  Container.Model.findByIdAndUpdate(req.param("id"), { "$set": {
    title: req.body.title,
    text: req.body.text
  }}, _handler(res));
});
app.get("/api/containers/:id", function (req, res) { // (R)ead
  Container.Model.findById(req.param("id"), _handler(res));
});
app.del("/api/containers/:id", function (req, res) { // (D)elete
  Container.Model.findByIdAndRemove(req.param("id"), _handler(res));
});

// Run server.
app.listen(PORT, ADDR);
console.log("Server started up at http://" + ADDR + ":" + PORT);
