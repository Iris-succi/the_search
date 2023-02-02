const models = require("../models");

const getSessions = (req, res) => {
  models.session
    .getSessions(req.payload.sub)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getSession = (req, res) => {
  const { id } = req.params;
  models.session
    .find(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addSession = (req, res) => {
  const session = JSON.parse(req.body.session);
  const { picture } = req;

  models.session
    .add(session, picture)
    .then((result) => {
      res.location(`/api/session/${result.insertId}`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { getSessions, getSession, addSession };
