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

module.exports = {
  getSpotVisited,
};
