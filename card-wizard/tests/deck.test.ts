import { Deck, Suit, Rank, PlayingCard } from '../src';

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  test('should create a standard 52-card deck', () => {
    expect(deck.remaining).toBe(52);
  });

  test('should create a deck with jokers', () => {
    const deckWithJokers = new Deck({ includeJokers: true, numJokers: 2 });
    expect(deckWithJokers.remaining).toBe(54);
  });

  test('should shuffle the deck', () => {
    // Save string representation of cards before shuffling
    const originalCards = deck.allCards.map(card => card.toString());
    
    // Shuffle the deck
    deck.shuffle();
    
    // Get string representation after shuffling
    const shuffledCards = deck.allCards.map(card => card.toString());
    
    // Check that at least one card has changed position
    let hasChangedPosition = false;
    for (let i = 0; i < originalCards.length; i++) {
      if (originalCards[i] !== shuffledCards[i]) {
        hasChangedPosition = true;
        break;
      }
    }
    
    // Verify that at least one card changed position
    expect(hasChangedPosition).toBe(true);
  });

  test('should deal a card from the deck', () => {
    const initialCount = deck.remaining;
    const card = deck.dealCard();
    
    expect(card).toBeDefined();
    expect(deck.remaining).toBe(initialCount - 1);
  });

  test('should deal multiple cards', () => {
    const initialCount = deck.remaining;
    const cardsToDeal = 5;
    const cards = deck.dealCards(cardsToDeal);
    
    expect(cards.length).toBe(cardsToDeal);
    expect(deck.remaining).toBe(initialCount - cardsToDeal);
  });

  test('should deal to multiple players', () => {
    const players = 4;
    const cardsPerPlayer = 5;
    const hands = deck.dealToPlayers(players, cardsPerPlayer);
    
    expect(hands.length).toBe(players);
    hands.forEach(hand => expect(hand.length).toBe(cardsPerPlayer));
    expect(deck.remaining).toBe(52 - (players * cardsPerPlayer));
  });

  test('should cut the deck', () => {
    const originalOrder = deck.allCards.map(card => card.toString());
    deck.cut(26); // Cut in the middle
    const cutOrder = deck.allCards.map(card => card.toString());
    
    expect(cutOrder).not.toEqual(originalOrder);
    expect(deck.remaining).toBe(52);
  });

  test('should sort the deck', () => {
    deck.shuffle();
    deck.sort();
    
    const sortedCards = deck.allCards;
    // Check if the first card is the two of clubs
    expect((sortedCards[0] as PlayingCard).suit).toBe(Suit.Clubs);
    expect((sortedCards[0] as PlayingCard).rank).toBe(Rank.Two);
    
    // Check if the last card is the ace of spades
    expect((sortedCards[51] as PlayingCard).suit).toBe(Suit.Spades);
    expect((sortedCards[51] as PlayingCard).rank).toBe(Rank.Ace);
  });

  test('should reset the deck', () => {
    deck.dealCards(10);
    expect(deck.remaining).toBe(42);
    
    deck.reset();
    expect(deck.remaining).toBe(52);
  });
}); 