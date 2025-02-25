# Card Wizard 🃏⚡️

[![Version](https://img.shields.io/npm/v/card-wizard.svg)](https://www.npmjs.com/package/card-wizard)
[![License](https://img.shields.io/npm/l/card-wizard.svg)](https://github.com/yourusername/card-wizard/blob/main/LICENSE)

A TypeScript library for card shuffling and dealing with standard playing cards. Card Wizard provides a robust and type-safe implementation of a standard 52-card deck with common operations used in card games.

## Features

- 🃏 Standard 52-card deck with optional Jokers
- 🔀 Multiple card shuffling techniques
- 🎮 Methods for dealing cards to players
- 🌈 Complete TypeScript type definitions
- 🧪 Fully tested API

## Installation

```bash
npm install card-wizard
```

or with yarn:

```bash
yarn add card-wizard
```

## Usage

```typescript
import { Deck, PlayingCard, Joker, createCard } from 'card-wizard';

// Create a standard 52-card deck
const deck = new Deck();

// Shuffle the deck
deck.shuffle();

// Deal a card
const card = deck.dealCard();   

// Deal multiple cards
const cards = deck.dealCards(5);

// Deal to players
const players = deck.dealToPlayers(2, 5);   

// Create a custom card
const customCard = createCard('hearts', 'king');

// Create a joker
const joker = new Joker();  
```

## API

### Deck Class

#### Constructor

```typescript
new Deck(options?: DeckOptions);
```

**Options:**

- `includeJokers?: boolean` - Whether to include jokers (default: false)
- `numJokers?: number` - Number of jokers to include (default: 2)

#### Methods

**Shuffling and Manipulation:**

- `shuffle(): this` - Shuffle the deck using the Fisher-Yates algorithm
- `cut(index?: number): this` - Cut the deck at specified index or randomly
- `sort(): this` - Sort the deck by suit and rank
- `reset(options?: DeckOptions): this` - Reset to a fresh deck

**Dealing:**

- `dealCard(): Card | undefined` - Deal one card from the top of the deck
- `dealCards(count: number): Card[]` - Deal multiple cards
- `dealToPlayers(numPlayers: number, cardsPerPlayer: number): Card[][]` - Deal cards to multiple players

**Properties:**

- `remaining: number` - Get the number of remaining cards
- `allCards: Card[]` - Get a copy of all cards in the deck

### Card Types

#### PlayingCard Class

#### Constructor

```typescript
new PlayingCard(suit: Suit, rank: Rank);
```

**Parameters:**

- `suit: Suit` - The suit of the card
- `rank: Rank` - The rank of the card

**Methods:**

- `toString(): string` - Get string representation (e.g., "hearts king")
- `getValue(): number` - Get card value (typically 0)

#### Joker Class

#### Constructor

```typescript
new Joker(color?: 'red' | 'black');
``` 

**Parameters:**

- `color?: 'red' | 'black'` - The color of the joker (default: 'red')

**Methods:**

- `toString(): string` - Get string representation (e.g., "red joker")
- `getValue(): number` - Get card value (typically 0)

#### Utility Types

**Suit Enum:**

```typescript
export enum Suit {
  Hearts = "hearts",
  Diamonds = "diamonds",
  Clubs = "clubs",
  Spades = "spades"
}
```

**Rank Enum:**

```typescript
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
```

**Card Interface:**

```typescript
export interface Card {
  suit: Suit;
  rank: Rank;
}
```

**Deck Options Interface:**

```typescript
export interface DeckOptions {
  includeJokers?: boolean;
  numJokers?: number;
}
```


**Card Deck Interface:**

```typescript
export interface CardDeck {
  cards: Card[];
  remaining: number;
}   
```

## Testing

The library is fully tested with Jest. To run the tests:

```bash
npm test
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

