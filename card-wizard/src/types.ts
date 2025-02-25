export enum Suit {
  Hearts = "hearts",
  Diamonds = "diamonds",
  Clubs = "clubs",
  Spades = "spades"
}

export enum Rank {
  Ace = "ace",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "jack",
  Queen = "queen",
  King = "king"
}

export interface Card {
  suit: Suit;
  rank: Rank;
}

export interface DeckOptions {
  includeJokers?: boolean;
  numJokers?: number;
}

export interface CardDeck {
  cards: Card[];
  remaining: number;
}

