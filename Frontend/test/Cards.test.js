import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Cards from '../src/components/Cards';
import jest from 'jest';

// Mock axios
jest.mock('axios');

describe('Cards Component', () => {
  beforeEach(() => {
    axios.post.mockReset();
    render(<Cards />);
  });

  test('renders initial state correctly', () => {
    // Check if all three cards are rendered
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(3);
    // Check if Play button is present
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  test('cards are initially disabled', () => {
    const cards = screen.getAllByRole('heading', { level: 1 });
    cards.forEach(card => {
      expect(card.closest('div.card')).toHaveStyle({ opacity: 0.7 });
    });
  });

  test('clicking Play button enables cards', () => {
    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);
    
    const cards = screen.getAllByRole('heading', { level: 1 });
    cards.forEach(card => {
      expect(card.closest('div.card')).toHaveStyle({ opacity: 1 });
    });
  });

  test('selecting a card shows switch message', async () => {
    // Mock successful API call
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    // Start game
    fireEvent.click(screen.getByText('Play'));

    // Click first card
    const cards = screen.getAllByRole('heading', { level: 1 });
    fireEvent.click(cards[0].closest('div.card'));

    // Check if message appears
    await waitFor(() => {
      expect(screen.getByText('Do you want to switch cards?')).toBeInTheDocument();
    });
  });

  test('selecting third card after initial selection reveals all cards', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    // Start game
    fireEvent.click(screen.getByText('Play'));

    // Select first card
    const cards = screen.getAllByRole('heading', { level: 1 });
    fireEvent.click(cards[0].closest('div.card'));

    // Select third card (assuming it's not the flipped card)
    fireEvent.click(cards[2].closest('div.card'));

    await waitFor(() => {
      expect(screen.getByText('Game Over! All cards revealed.')).toBeInTheDocument();
    });
  });

  test('reset button returns game to initial state', async () => {
    // Start game
    fireEvent.click(screen.getByText('Play'));

    // Click Reset
    const resetButton = screen.getByText('Reset Game');
    fireEvent.click(resetButton);

    // Check if Play button is back
    expect(screen.getByText('Play')).toBeInTheDocument();

    // Check if cards are disabled
    const cards = screen.getAllByRole('heading', { level: 1 });
    cards.forEach(card => {
      expect(card.closest('div.card')).toHaveStyle({ opacity: 0.7 });
    });
  });

  test('API call is made when card is selected', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    // Start game
    fireEvent.click(screen.getByText('Play'));

    // Select first card
    const cards = screen.getAllByRole('heading', { level: 1 });
    fireEvent.click(cards[0].closest('div.card'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/card-selection',
        expect.any(Object)
      );
    });
  });

  test('handles API error gracefully', async () => {
    // Mock failed API call
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.post.mockRejectedValueOnce(new Error('API Error'));

    // Start game
    fireEvent.click(screen.getByText('Play'));

    // Select first card
    const cards = screen.getAllByRole('heading', { level: 1 });
    fireEvent.click(cards[0].closest('div.card'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});