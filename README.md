# Dice Wizard 🎲⚡️

A flexible TypeScript/JavaScript utility package for rolling and manipulating dice results.

## Installation

```bash
npm install dice-wizard
```

## Usage

```typescript
import { DiceWizard } from "dice-wizard";

const diceWizard = new DiceWizard();
const result = diceWizard.roll("d20");
console.log(result);
```

## API Reference

### `DiceRoller` Class

#### `roll(count: number, dieType: DieType): DieResult[]`

Rolls a specified number of dice of a given type.

- `count`: Number of dice to roll
- `dieType`: Type of die (4, 6, 8, 10, 12, 20, or 100)
- Returns: Array of die results

#### `getSum(): number`

Gets the sum of the last roll.

- Returns: Total value of all dice in last roll

#### `keepValues(values: number[]): DieResult[]`

Keeps only dice with specific values from the last roll.

- `values`: Array of values to keep
- Returns: Filtered array of die results

#### `removeValues(values: number[]): DieResult[]`

Removes dice with specific values from the last roll.

- `values`: Array of values to remove
- Returns: Filtered array of die results

#### `keepHighest(count: number): DieResult[]`

Gets the highest N dice from the last roll.

- `count`: Number of dice to keep
- Returns: Array of the highest value die results

#### `keepLowest(count: number): DieResult[]`

Gets the lowest N dice from the last roll.

- `count`: Number of dice to keep
- Returns: Array of the lowest value die results

## Types

typescript
type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;
interface DieResult {
value: number;
dieType: DieType;
}

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Justin Michaliga](https://github.com/jmichaliga)
