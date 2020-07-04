const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', (req, res) => {

});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.status(200).send('gtg');
});

module.exports = router;