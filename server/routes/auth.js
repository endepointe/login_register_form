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
            res.status(200).send({
              status: 0,
              msg: 'User already exists.'
            });
          } else {
            console.log('create user');
            db.query(`INSERT INTO users VALUES ('${email}', '${hash}')`)
              .then((data) => {
                console.log(data);
                let at = email.indexOf('@');
                res.status(200).send({
                  status: 1,
                  msg: `Welcome, ${email.slice(0, at)}`
                });
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
  const key = email.concat('', password);
  db.oneOrNone('SELECT email, password FROM users WHERE email = $1', `${email}`)
    .then((response) => {
      if (response !== null) {
        bcrypt.compare(key, response.password, (err, result) => {
          try {
            if (err) {
              throw err;
            }
            if (result) {
              let at = email.indexOf('@');
              console.log(email.slice(0, at));
              res.status(200).send({
                status: 1,
                msg: `Welcome, ${email.slice(0, at)}`
              });
            } else {
              res.status(200).send({
                status: 2,
                msg: "Invalid credentials, try again."
              });
            }
          } catch (err) {
            res.status(500).send('Network error, try again.');
          }
        });
      } else {
        console.log(response)
        res.status(200).send({
          status: 0,
          msg: 'Account not found, try again.'
        });
      }
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
});

module.exports = router;