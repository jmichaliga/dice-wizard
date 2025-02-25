import { Card, Rank, Suit } from './types';

export class PlayingCard implements Card {
  constructor(public suit: Suit, public rank: Rank) {}

  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }

  // Returns the value of the card (for games like Blackjack)
  getValue(aceHigh: boolean = true): number {
    switch (this.rank) {
      case Rank.Ace:
        return aceHigh ? 11 : 1;
      case Rank.Two:
        return 2;
      case Rank.Three:
        return 3;
      case Rank.Four:
        return 4;
      case Rank.Five:
        return 5;
      case Rank.Six:
        return 6;
      case Rank.Seven:
        return 7;
      case Rank.Eight:
        return 8;
      case Rank.Nine:
        return 9;
      case Rank.Ten:
      case Rank.Jack:
      case Rank.Queen:
      case Rank.King:
        return 10;
      default:
        return 0;
    }
  }

  // For comparison between cards
  get sortOrder(): number {
    const suitOrder: Record<Suit, number> = {
      [Suit.Clubs]: 0,
      [Suit.Diamonds]: 1,
      [Suit.Hearts]: 2,
      [Suit.Spades]: 3
    };

    const rankOrder: Record<Rank, number> = {
      [Rank.Two]: 0,
      [Rank.Three]: 1,
      [Rank.Four]: 2,
      [Rank.Five]: 3,
      [Rank.Six]: 4,
      [Rank.Seven]: 5,
      [Rank.Eight]: 6,
      [Rank.Nine]: 7,
      [Rank.Ten]: 8,
      [Rank.Jack]: 9,
      [Rank.Queen]: 10,
      [Rank.King]: 11,
      [Rank.Ace]: 12
    };

    return suitOrder[this.suit] * 13 + rankOrder[this.rank];
  }
}

// Factory function to create a card
export function createCard(suit: Suit, rank: Rank): PlayingCard {
  return new PlayingCard(suit, rank);
}

// Special card type for Jokers
export class Joker implements Card {
  readonly suit: Suit = "joker" as Suit;
  readonly rank: Rank = "joker" as Rank;
  readonly color: 'red' | 'black';

  constructor(color: 'red' | 'black' = 'red') {
    this.color = color;
  }

  toString(): string {
    return `${this.color} joker`;
  }

  getValue(): number {
    return 0; // Jokers typically have special handling in games
  }

  get sortOrder(): number {
    return this.color === 'red' ? 52 : 53;
  }
}
