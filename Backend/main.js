const express = require("express");
const cors = require("cors");
const app = express();
const lucky_card = require("./cards.js").getLuckyCard;

// Store the details of selected cards
let events = [];

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle card selections
app.post("/api/card-selection", (req, res) => {
  const { selectedCard } = req.body;
  let card = null;
  // Store the details of this current event
  events.push({
    lucky_card: card,
    selected_card: selectedCard,
    timestamp: new Date(),
  });

  card = sendCard(events);
  events[events.length - 1].lucky_card = card;
  console.log("events", events);
  res.json({ card_to_flip: card, status: "success", success: true });
});

// User won the game or not
app.post("/api/game-result", (req, res) => {
  const { selectedCard } = req.body;
  if (events[events.length - 1].lucky_card === selectedCard) {
    res.json({ status: "won", success: true });
  } else {
    res.json({ status: "lost", success: true });
  }
});

// send card to frontend
function sendCard(events) {
  let card = lucky_card();
  console.log("lucky card", card);
  let selectedCard = events[events.length - 1].selected_card;
  // all the cards we have
  let all_cards = new Set([1, 2, 3]);
  // get the card whihc we know user haven't selected and also is not the lucky card
  let send_card = all_cards.difference(new Set([card, selectedCard]));

  console.log("send_card", send_card.values().next().value);

  return send_card.values().next().value;
}

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
