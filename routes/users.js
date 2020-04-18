const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/users', (req, res) => {
  // не очень понятно, чем нам здесь помогает динамический путь? думал от корня проекта код исполняется,
  // пришлось одниматься на ступень выше через ..
  const filepath = path.join(__dirname, '..', 'data', 'users.json');
  fs.readFile(filepath, {encoding: 'utf8'}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
});


router.get('/users/:id', (req, res) => {
  try {
    // не очень понятно, чем нам здесь помогает динамический путь? думал от корня проекта код исполняется,
    // пришлось одниматься на ступень выше через ..
    const filepath = path.join(__dirname, '..', 'data', 'users.json');
    // при отправке res.send объет опций { encoding: 'utf8' } стоит по умолчанию
    const users = fs.readFileSync(filepath);
    const currentUser = JSON.parse(users).find((item) => item._id === req.params.id);

    if (!currentUser) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }

    // при получении информации о пользователе, данные отображаются криво, хотя application/json (можно сравнить с /users
    // в чем может быть загвоздка?
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(currentUser));
  } catch (e) {
    console.log(e);
  }
});


module.exports = router;

