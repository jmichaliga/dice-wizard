export type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export interface DieResult {
  value: number;
  dieType: DieType;
}

export class DiceRoller {
  private results: DieResult[] = [];

  /**
   * Roll a specific number of dice of a given type
   * @param count Number of dice to roll
   * @param dieType Type of die (number of sides)
   * @returns Array of die results
   */
  roll(count: number, dieType: DieType): DieResult[] {
    const results: DieResult[] = [];
    
    for (let i = 0; i < count; i++) {
      const value = Math.floor(Math.random() * dieType) + 1;
      results.push({ value, dieType });
    }

    this.results = results;
    return results;
  }

  /**
   * Get the sum of the last roll
   * @returns Total value of all dice in last roll
   */
  getSum(): number {
    return this.results.reduce((sum, die) => sum + die.value, 0);
  }

  /**
   * Filter dice from the last roll based on their values
   * @param predicate Function to determine which dice to keep
   * @returns Filtered array of die results
   */
  filterDice(predicate: (die: DieResult) => boolean): DieResult[] {
    return this.results.filter(predicate);
  }

  /**
   * Keep only dice with specific values from the last roll
   * @param values Array of values to keep
   * @returns Filtered array of die results
   */
  keepValues(values: number[]): DieResult[] {
    return this.filterDice(die => values.includes(die.value));
  }

  /**
   * Remove dice with specific values from the last roll
   * @param values Array of values to remove
   * @returns Filtered array of die results
   */
  removeValues(values: number[]): DieResult[] {
    return this.filterDice(die => !values.includes(die.value));
  }

  /**
   * Get the highest N dice from the last roll
   * @param count Number of dice to keep
   * @returns Array of the highest value die results
   */
  keepHighest(count: number): DieResult[] {
    return [...this.results]
      .sort((a, b) => b.value - a.value)
      .slice(0, count);
  }

  /**
   * Get the lowest N dice from the last roll
   * @param count Number of dice to keep
   * @returns Array of the lowest value die results
   */
  keepLowest(count: number): DieResult[] {
    return [...this.results]
      .sort((a, b) => a.value - b.value)
      .slice(0, count);
  }
} 