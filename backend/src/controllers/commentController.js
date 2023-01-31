const models = require("../models");

const browse = (req, res) => {
  models.comment
    .find(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addComment = (req, res) => {
  const comment = req.body;

  models.comment
    .insertComment(comment)
    .then(([result]) => {
      res.location(`/spots/${result.spot_id}/comment`).send(result).status(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { browse, addComment };
