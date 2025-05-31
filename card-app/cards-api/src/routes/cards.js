const express = require('express');
const {
  getCards,
  createCard,
  updateCard,
  deleteCard
} = require('../controllers/cardController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, createCard);
router.put('/:id', authMiddleware, updateCard);
router.delete('/:id', authMiddleware, deleteCard);

module.exports = router;
