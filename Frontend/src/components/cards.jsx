import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);
  const [allFlipped, setAllFlipped] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMessage, setGameMessage] = useState('');

  const startGame = () => {
    setGameStarted(true);
    setSelectedCard(null);
    setFlippedCard(null);
    setAllFlipped(false);
    setGameMessage('');
  };

  const handleCardClick = async (cardNumber) => {
    if (!gameStarted) return;

    if (selectedCard === null) {
      setSelectedCard(cardNumber);
      // Randomly flip one of the other cards
      const remainingCards = [1, 2, 3].filter(num => num !== cardNumber);
      const randomCard = remainingCards[Math.floor(Math.random() * remainingCards.length)];
      setFlippedCard(randomCard);
      setGameMessage('Do you want to switch cards?');

      // Send selected card to backend
      try {
        await axios.post('http://localhost:3001/api/card-selection', {
          selectedCard: cardNumber
        });
      } catch (error) {
        console.error('Error sending card selection:', error);
      }
    } else if (cardNumber !== selectedCard && cardNumber !== flippedCard) {
      setAllFlipped(true);
      setGameMessage('Game Over! All cards revealed.');
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedCard(null);
    setFlippedCard(null);
    setAllFlipped(false);
    setGameMessage('');
  };

  const renderCard = (number) => {
    const isSelected = selectedCard === number;
    const isFlipped = flippedCard === number || allFlipped;

    return (
      <div 
        className={`card ${isSelected ? 'bg-success' : ''} ${isFlipped ? 'bg-warning' : ''}`}
        style={{ 
          cursor: gameStarted ? 'pointer' : 'not-allowed',
          minHeight: '200px',
          opacity: gameStarted ? 1 : 0.7
        }}
        onClick={() => handleCardClick(number)}
      >
        <div className="card-body text-center">
          <h1 className="card-title">{number}</h1>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Card Game</h2>
      <div className="row">
        {[1, 2, 3].map(number => (
          <div key={number} className="col-md-4 mb-4">
            {renderCard(number)}
          </div>
        ))}
      </div>
      
      {/* Game Message Section */}
      {gameMessage && (
        <div className="text-center my-4">
          <h3 className="fw-bold">{gameMessage}</h3>
        </div>
      )}
      
      {/* Game Controls */}
      <div className="text-center mt-4">
        {!gameStarted ? (
          <button 
            className="btn btn-primary btn-lg"
            onClick={startGame}
          >
            Play
          </button>
        ) : (
          <button 
            className="btn btn-secondary btn-lg"
            onClick={resetGame}
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;