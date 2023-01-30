const models = require("../models");

const browse = (req, res) => {
  models.spot
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.spot
    .find(req.params.id)
    .then(([result]) => {
      if (!result[0]) {
        res.sendStatus(404);
        return;
      }
      const spot = result[0];
      models.comment
        .getCommentsBySpotId(req.params.id)
        .then(([comments]) => {
          console.warn(comments);
          spot[0].comments = comments;
          res.send(spot);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { browse, read };
