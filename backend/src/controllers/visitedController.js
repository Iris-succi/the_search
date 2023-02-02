const models = require("../models");

const getSpotVisited = (req, res) => {
  models.spot_visited
    .getSpotsVisited(req.payload.sub)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addSpotVisited = (req, res) => {
  const spot = req.body;
  models.spot_visited
    .addSpotVisited(spot)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getSpotVisited,
  addSpotVisited,
};
