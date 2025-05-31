const { Card } = require("../models/index");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.findAll({ where: { userId: req.user.id } });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.createCard = async (req, res) => {
  try {
    const newCard = await Card.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!card) return res.status(404).json({ message: "Card not found" });

    await card.update(req.body);
    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!card) return res.status(404).json({ message: "Card not found" });

    await card.destroy();
    res.json({ message: "Card deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
