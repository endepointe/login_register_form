const router = require('express').Router();
const { db } = require('../dbs/pgp/psql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', async (req, res) => {

  console.log(db);
  const { email, password } = req.body;
  const lock = email.concat('', password);

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(lock, salt, (err, hash) => {
      // console.log(`Hashed: ${hash}, length: ${hash.length}`);
      // console.log(`orig: ${password}`);
      // console.log(`user: ${email}`);
      // console.log(`lock: ${lock}`);
      db.oneOrNone('SELECT * FROM users WHERE email = $1', `${email}`)
        .then((result) => {
          if (result !== null) {
            console.log('user exists');
            res.status(200).send('User already exists.');
          } else {
            console.log('create user');
            db.query(`INSERT INTO users VALUES ('${email}', '${hash}')`)
              .then((data) => {
                console.log(data);
                res.status(200).send('Successfully registered');
              })
              .catch((error) => {
                console.log(error.message);
                res.status(500).send('Issue with Registration');
              });
          }
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.status(200).send('gtg');
});

module.exports = router;