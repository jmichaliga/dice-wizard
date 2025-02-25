import { Card, DeckOptions, Rank, Suit } from './types';
import { PlayingCard, Joker } from './card';

export class Deck {
  private cards: Card[] = [];
  
  constructor(options: DeckOptions = {}) {
    this.initialize(options);
  }

  private initialize(options: DeckOptions): void {
    // Create standard 52-card deck
    const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades];
    const ranks = [
      Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five, 
      Rank.Six, Rank.Seven, Rank.Eight, Rank.Nine, Rank.Ten, 
      Rank.Jack, Rank.Queen, Rank.King
    ];
    
    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new PlayingCard(suit, rank));
      }
    }

    // Add jokers if specified
    if (options.includeJokers) {
      const numJokers = options.numJokers || 2;
      for (let i = 0; i < numJokers; i++) {
        this.cards.push(new Joker(i % 2 === 0 ? 'red' : 'black'));
      }
    }
  }

  // Improved Fisher-Yates shuffle algorithm with verification
  shuffle(): this {
    const originalOrder = [...this.cards];
    let isShuffled = false;
    let attempts = 0;
    const maxAttempts = 3;

    // Shuffle until we get a different order or reach max attempts
    while (!isShuffled && attempts < maxAttempts) {
      // Standard Fisher-Yates shuffle
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
      
      // Check if the order actually changed
      isShuffled = false;
      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i] !== originalOrder[i]) {
          isShuffled = true;
          break;
        }
      }
      
      attempts++;
    }
    
    // Force a shuffle if random shuffling didn't change the order
    if (!isShuffled && this.cards.length > 1) {
      // Simple cut in the middle
      const midPoint = Math.floor(this.cards.length / 2);
      this.cards = [...this.cards.slice(midPoint), ...this.cards.slice(0, midPoint)];
    }
    
    return this;
  }

  // Deal a single card from the top of the deck
  dealCard(): Card | undefined {
    return this.cards.pop();
  }

  // Deal multiple cards
  dealCards(count: number): Card[] {
    if (count <= 0) return [];
    if (count > this.cards.length) count = this.cards.length;
    
    return this.cards.splice(this.cards.length - count, count);
  }

  // Deal to multiple players
  dealToPlayers(numPlayers: number, cardsPerPlayer: number): Card[][] {
    if (numPlayers <= 0 || cardsPerPlayer <= 0) {
      return [];
    }

    const hands: Card[][] = Array(numPlayers).fill(null).map(() => []);
    
    // Deal cards one at a time to each player
    for (let i = 0; i < cardsPerPlayer; i++) {
      for (let j = 0; j < numPlayers; j++) {
        const card = this.dealCard();
        if (card) {
          hands[j].push(card);
        }
      }
    }
    
    return hands;
  }

  // Cut the deck at a specified point or randomly
  cut(index?: number): this {
    if (this.cards.length <= 1) return this;
    
    const cutIndex = index !== undefined 
      ? Math.max(0, Math.min(index, this.cards.length - 1))
      : Math.floor(Math.random() * (this.cards.length - 1)) + 1;
    
    this.cards = [...this.cards.slice(cutIndex), ...this.cards.slice(0, cutIndex)];
    return this;
  }

  // Sort the deck
  sort(): this {
    this.cards.sort((a, b) => {
      if ('sortOrder' in a && 'sortOrder' in b) {
        return (a as PlayingCard).sortOrder - (b as PlayingCard).sortOrder;
      }
      return 0;
    });
    return this;
  }

  // Reset to a fresh deck
  reset(options: DeckOptions = {}): this {
    this.cards = [];
    this.initialize(options);
    return this;
  }

  // Get remaining cards count
  get remaining(): number {
    return this.cards.length;
  }

  // Get a copy of all remaining cards without modifying the deck
  get allCards(): Card[] {
    return [...this.cards];
  }
}
