const router = require('express').Router();
const path = require('path');
const fs = require('fs');

let cards = null;

router.get('/cards', (req, res) => {
  try {
    if (!cards) {
      const filepath = path.join(__dirname, '..', 'data', 'cards.json');
      const cardsText = fs.readFileSync(filepath);
      cards = JSON.parse(cardsText);
    }
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router;
