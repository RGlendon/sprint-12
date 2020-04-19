const router = require('express').Router();
const path = require('path');
const fs = require('fs');

let users = null;
let currentUser = null;

function readUsersFile(req, res, next) {
  try {
    const filepath = path.join(__dirname, '..', 'data', 'users.json');

    if (!users) {
      const usersText = fs.readFileSync(filepath);
      users = JSON.parse(usersText.toString());
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

function findUser(req, res, next) {
  currentUser = users.find((item) => item._id === req.params.id);

  if (!currentUser) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  next();
}


router.get('/users', readUsersFile);
router.get('/users', (req, res) => {
  res.send(users);
});


router.get('/users/:id', readUsersFile);
router.get('/users/:id', findUser);
router.get('/users/:id', (req, res) => {
  res.send(currentUser);
});


module.exports = router;
