/* eslint-disable array-callback-return */
const models = require("../models");

const getFavorites = (req, res) => {
  models.favorite
    .getFavorites(req.params.id)
    .then(([rows]) => {
      const favorite = [rows];
      rows.map((row) => {
        models.spot
          .find(row.spot_id)
          .then(([spot]) => {
            console.warn(spot);
            favorite.spot = spot;
          })
          .catch((err) => {
            console.error(err);
          });
      });
      res.send(favorite);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* const addFavorite = (req, res) => {
  const favorite = req.body;

  models.favorite
    .insert(favorite)
    .then(([result]) => {
      res.location(`/api/user/${result.insertId}`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
 */
module.exports = {
  getFavorites,
};
