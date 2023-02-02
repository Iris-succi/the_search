const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const avatarDirectory = process.env.UPLOAD_DIR;

const renameAvatar = (req, res, next) => {
  const { originalname } = req.file;

  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();

  fs.rename(
    `${avatarDirectory}${filename}`,
    `${avatarDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.avatar = `${uuid}-${originalname}`;
      console.warn(req.avatar);
      next();
    }
  );
};

const sendAvatar = (req, res) => {
  const { fileName } = req.params;

  res.download(avatarDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Avatar not found.`,
      });
    }
  });
};

const pictureDirectory = process.env.UPLOAD_DIR_SESSION;

const renamePicture = (req, res, next) => {
  const { originalname } = req.file;
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();

  fs.rename(
    `${pictureDirectory}${filename}`,
    `${pictureDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.picture = `${uuid}-${originalname}`;
      console.warn(req.picture);
      next();
    }
  );
};

const sendPicture = (req, res) => {
  const { fileName } = req.params;

  res.download(pictureDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `picture not found.`,
      });
    }
  });
};

module.exports = { renameAvatar, sendAvatar, renamePicture, sendPicture };
