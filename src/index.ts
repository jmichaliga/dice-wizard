export type DieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export interface DieResult {
  value: number;
  dieType: DieType;
}

export class DiceWizard {
  private results: DieResult[] = [];

  /**
   * Roll dice using either string notation (e.g. 'd20', '3d6') or number parameters
   * @param countOrNotation Number of dice or string notation
   * @param dieType Type of die (optional if using string notation)
   * @returns Array of die results
   */
  roll(countOrNotation: number | string, dieType?: DieType): DieResult[] {
    let count: number;
    let type: DieType;

    if (typeof countOrNotation === 'string') {
      const match = countOrNotation.toLowerCase().match(/^(\d+)?d(\d+)$/);
      if (!match) {
        throw new Error('Invalid dice notation. Use format: "d20" or "3d6"');
      }
      count = match[1] ? parseInt(match[1], 10) : 1;
      type = parseInt(match[2], 10) as DieType;
      
      if (!this.isValidDieType(type)) {
        throw new Error(`Invalid die type: d${type}`);
      }
    } else {
      count = countOrNotation;
      type = dieType as DieType;
      
      if (!this.isValidDieType(type)) {
        throw new Error(`Invalid die type: d${type}`);
      }
    }

    const results: DieResult[] = [];
    
    for (let i = 0; i < count; i++) {
      const value = Math.floor(Math.random() * type) + 1;
      results.push({ value, dieType: type });
    }

    this.results = results;
    return results;
  }

  private isValidDieType(type: number): type is DieType {
    return [4, 6, 8, 10, 12, 20, 100].includes(type);
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

export default DiceWizard; 