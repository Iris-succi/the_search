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
