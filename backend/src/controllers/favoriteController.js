const models = require("../models");

const getFavorites = (req, res) => {
  models.favorite
    .getFavorites(req.payload.sub)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteFavorite = (req, res) => {
  models.favorite
    .delete(req.payload.sub, req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getFavorites,
  deleteFavorite,
};
