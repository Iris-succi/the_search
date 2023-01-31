DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(200) NOT NULL,
  city varchar(100),
  avatar varchar(255),
  hashedPassword varchar(100) NOT NULL,
  date_creation DATETIME NOT NULL DEFAULT NOW() 
);

INSERT INTO user (firstname, lastname, email, city, avatar, hashedPassword, date_creation) VALUES ('Iris', 'Succi', 'iris@gmail.com', 'Cannes', 'iris.jpg', '$argon2id$v=19$m=65536,t=5,p=1$cHKCeWcTAbFAoQip2FBoSQ$YEwzjtbjy/r88czZmo+Ess3AGPYvhonN2HTureWf3NY', '2019-01-01 00:00:00'),('Madeline', 'Thomas', 'madeline@gmail.com', 'Los Angeles', 'madeline.jpg', '$argon2id$v=19$m=65536,t=5,p=1$cHKCeWcTAbFAoQip2FBoSQ$YEwzjtbjy/r88czZmo+Ess3AGPYvhonN2HTureWf3NY','2019-01-01 00:00:00');

DROP TABLE IF EXISTS spot;

CREATE TABLE spot (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  city varchar(100) NOT NULL,
  country varchar(100) NOT NULL,
  latitude varchar(100) NOT NULL,
  longitude varchar(100) NOT NULL,
  picture TEXT,
  type varchar(100) NOT NULL,
  level varchar(100) NOT NULL,
  prevision TEXT,
  webcam TEXT
);

INSERT INTO spot (name, city, country, latitude, longitude, picture, type, level, prevision, webcam) VALUES ('Uluwatu', 'Uluwatu', 'Bali', '-8.8197', '115.0918', 'uluwatu.jpg', 'reef', 'expert', 'https://magicseaweed.com/Uluwatu-Surf-Report/1/', 'https://www.surfline.com/surf-report/uluwatu/5842041f4e65fad6a7708a0d'),('Teahupoo', 'Teahupoo', 'Tahiti', '-17.5383', '-149.5667', 'teahupoo.jpg', 'reef', 'expert', 'https://magicseaweed.com/Teahupoo-Surf-Report/1/', 'https://www.surfline.com/surf-report/teahupoo/5842041f4e65fad6a7708a0e'),('Pipeline', 'Pipeline', 'Hawaii', '21.9817', '-159.3717', 'pipeline.jpg', 'reef', 'expert', 'https://magicseaweed.com/Pipeline-Surf-Report/1/', 'https://www.surfline.com/surf-report/pipeline/5842041f4e65fad6a7708a0f'),('La cote des basques', 'Biarritz', 'France', '43.4833', '-1.5667', 'biarritz.jpg', 'beach', 'beginner', 'https://magicseaweed.com/Biarritz-Surf-Report/1/', 'https://www.surfline.com/surf-report/biarritz/5842041f4e65fad6a7708a10'),('La Gravière', 'La Gravière',  'France', '43.4833', '-1.5667', 'lagraviere.jpg', 'beach', 'beginner', 'https://magicseaweed.com/La-Graviere-Surf-Report/1/', 'https://www.surfline.com/surf-report/la-graviere/5842041f4e65fad6a7708a11'),('La Torche', 'La Torche', 'France', '48.4833', '-4.5667', 'latorche.jpg', 'beach', 'beginner', 'https://magicseaweed.com/La-Torche-Surf-Report/1/', 'https://www.surfline.com/surf-report/la-torche/5842041f4e65fad6a7708a12'); 

DROP TABLE IF EXISTS comment;

CREATE TABLE comment (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  comment TEXT NOT NULL,
  note int NOT NULL,
  user_id int,
  spot_id int,
  date_creation DATETIME NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (spot_id) REFERENCES spot(id)
);

INSERT INTO comment (user_id, spot_id, comment, note, date_creation) VALUES (1, 1, 'Super spot belle gauche !', '4','2019-01-01 00:00:00'),(1, 2, 'Super spot meme si j ai cassé ma board !','4', '2019-01-01 00:00:00'),(1, 3, 'Super spot attention rocher!','4','2019-01-01 00:00:00'),(1, 4, 'Parfait', '3','2019-01-01 00:00:00'),(1, 5, 'Meilleur spot', '5','2019-01-01 00:00:00'),(1, 6, 'Parfait pour les débutant','3', '2019-01-01 00:00:00'),(2, 1, 'Trop beau spot','4', '2019-01-01 00:00:00'),(2, 2, 'Super spot !','4', '2019-01-01 00:00:00'),(2, 3, 'Super spot !','5', '2019-01-01 00:00:00'),(2, 4, 'Vague qui deferle longtemps','5', '2019-01-01 00:00:00'),(2, 5, 'Attention au rocher', '2','2019-01-01 00:00:00'),(2, 6, 'Super spot !','4', '2019-01-01 00:00:00');

DROP TABLE IF EXISTS favorite;

CREATE TABLE favorite (
  id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int,
  spot_id int,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (spot_id) REFERENCES spot(id)
);

INSERT INTO favorite (user_id, spot_id) VALUES (1, 1),(1, 2),(1, 3),(1, 4),(1, 5),(1, 6),(2, 1),(2, 3),(2, 4),(2, 6);

DROP TABLE IF EXISTS spot_visited;

CREATE TABLE spot_visited (
  user_id int,
  spot_id int,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (spot_id) REFERENCES spot(id)
);