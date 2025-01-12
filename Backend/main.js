const express = require('express');
const cors = require('cors');
const app = express();

// Store selected cards
let selectedCards = [];

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle card selections
app.post('/api/card-selection', (req, res) => {
  const { selectedCard } = req.body;
  selectedCards.push({
    card: selectedCard,
    timestamp: new Date()
  });
  console.log('Card selected:', selectedCard);
  console.log('All selections:', selectedCards);
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});