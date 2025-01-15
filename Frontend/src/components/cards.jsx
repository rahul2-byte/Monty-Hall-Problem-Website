import { useState } from "react";
import axios from "axios";

const Cards = () => {
  const API_URL = "http://localhost:3001";

  const [gameStarted, setGameStarted] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [allFlipped, setAllFlipped] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setSelectedCard(null);
    setFlippedCards([]); // Reset flipped cards
    setAllFlipped(false);
    setGameMessage("Choose one card!!");
  };

  const handleCardClick = async (cardNumber) => {
    if (!gameStarted) return;

    if (selectedCard === null) {
      setSelectedCard(cardNumber);
      // Send selected card to backend
      try {
        const response = await axios.post(`${API_URL}/api/card-selection`, {
          selectedCard: cardNumber,
        });
        // Flip the card suggested by the backend
        if (response.data.success) setFlippedCards([response.data.card_to_flip]); // For example, log the suggestion
        setGameMessage("Do you want to switch cards?");

      } catch (error) {
        console.error("Error sending card selection:", error);
        setGameMessage("Failed to process selection. Please try again. Internal server error.");
      }
    } else if (
      cardNumber !== selectedCard &&
      !flippedCards.includes(cardNumber)
    ) {
      const result=  await axios.post(`${API_URL}/api/game-result`, {
        selectedCard: cardNumber,
      });

      setFlippedCards([selectedCard, cardNumber]);
      setAllFlipped(true);

      if (result.data.status === "won") {
        setGameMessage("Congratulations! You won the game.");
      } else {
        setGameMessage("Sorry! You lost the game. But keep it Up!!");
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedCard(null);
    setFlippedCards([]); // Reset flipped cards
    setAllFlipped(false);
    setGameMessage("");
  };

  const renderCard = (number) => {
    const isSelected = selectedCard === number;
    const isFlipped = flippedCards.includes(number) || allFlipped;

    return (
      <div
        className={`w-80 h-80 flex justify-center items-center text-8xl border-2 
          rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-300 ${
            isFlipped ? "bg-red-400" : ""
          } ${isSelected ? "bg-green-400" : ""}`}
        onClick={() => handleCardClick(number)}
      >
        <div className="card-body text-center">
          <h1 className="card-title">{isFlipped ? "🎉" : number}</h1>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold m-10">Monty hall problem</h1>
      <h2 className="text-center mb-6 text-2xl">Start the game!!</h2>
      <div className="grid grid-cols-3 gap-6 m-4">
        {[1, 2, 3].map((number) => renderCard(number))}
      </div>

      {/* Game Message Section */}
      {gameMessage && (
        <div className="text-center my-4">
          <h3 className="font-bold">{gameMessage}</h3>
        </div>
      )}

      {/* Game Controls */}
      <div className="text-center mt-4">
        {!gameStarted ? (
          <button
            className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-950"
            onClick={startGame}
          >
            Play
          </button>
        ) : (
          <button
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
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
