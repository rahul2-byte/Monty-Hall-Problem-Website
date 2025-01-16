const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes (assuming we've moved routes to a separate file)
let selectedCards = [];
app.post('/api/card-selection', (req, res) => {
  const { selectedCard } = req.body;
  selectedCards.push({
    card: selectedCard,
    timestamp: new Date()
  });
  res.json({ success: true });
});

describe('Backend API Tests', () => {
  beforeEach(() => {
    selectedCards = [];
  });

  it('POST /api/card-selection - successful card selection', async () => {
    const response = await request(app)
      .post('/api/card-selection')
      .send({ selectedCard: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(selectedCards).toHaveLength(1);
    expect(selectedCards[0].card).toBe(1);
  });

  it('POST /api/card-selection - handles missing card number', async () => {
    const response = await request(app)
      .post('/api/card-selection')
      .send({});

    expect(response.status).toBe(200);
    expect(selectedCards).toHaveLength(1);
    expect(selectedCards[0].card).toBeUndefined();
  });

  it('POST /api/card-selection - stores timestamp', async () => {
    const response = await request(app)
      .post('/api/card-selection')
      .send({ selectedCard: 2 });

    expect(selectedCards[0].timestamp).toBeInstanceOf(Date);
  });

  it('POST /api/card-selection - handles multiple selections', async () => {
    await request(app)
      .post('/api/card-selection')
      .send({ selectedCard: 1 });

    await request(app)
      .post('/api/card-selection')
      .send({ selectedCard: 2 });

    expect(selectedCards).toHaveLength(2);
    expect(selectedCards[0].card).toBe(1);
    expect(selectedCards[1].card).toBe(2);
  });
});