const express = require('express');
const cors = require('cors');
const app = express();
const lucky_card = require('./cards.js').getLuckyCard;

// Store the details of selected cards
let events = [];

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle card selections
app.post('/api/card-selection', (req, res) => {
  const { selectedCard } = req.body;
  events.push({
    card: selectedCard,
    timestamp: new Date()
  });
  console.log('Card selected:', selectedCard);
  console.log("lucky card", lucky_card());
  console.log('All selections:', events);
  res.json({ success: true });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});