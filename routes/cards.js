const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/cards', (req, res) => {
  try {
    // не очень понятно, чем нам здесь помогает динамический путь? думал от корня проекта код исполняется,
    // пришлось одниматься на ступень выше через ..
    const filepath = path.join(__dirname, '..', 'data', 'cards.json');
    // при отправке res.send объет опций { encoding: 'utf8' } стоит по умолчанию
    const cards = fs.readFileSync(filepath);
    res.set('Content-Type', 'application/json');
    res.send(cards);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

