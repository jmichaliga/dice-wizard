import { DiceRoller, DieType } from '../index';

describe('DiceRoller', () => {
  let roller: DiceRoller;

  beforeEach(() => {
    roller = new DiceRoller();
  });

  test('roll returns correct number of dice', () => {
    const count = 3;
    const dieType: DieType = 6;
    const results = roller.roll(count, dieType);
    
    expect(results.length).toBe(count);
    results.forEach(result => {
      expect(result.dieType).toBe(dieType);
      expect(result.value).toBeGreaterThanOrEqual(1);
      expect(result.value).toBeLessThanOrEqual(dieType);
    });
  });

  test('getSum returns correct total', () => {
    const results = roller.roll(3, 6);
    const sum = roller.getSum();
    const expectedSum = results.reduce((total, die) => total + die.value, 0);
    
    expect(sum).toBe(expectedSum);
  });

  test('keepValues filters correctly', () => {
    roller.roll(5, 6);
    const valuesToKeep = [1, 2];
    const filtered = roller.keepValues(valuesToKeep);
    
    filtered.forEach(result => {
      expect(valuesToKeep).toContain(result.value);
    });
  });

  test('keepHighest returns correct number of highest dice', () => {
    const results = roller.roll(5, 6);
    const count = 2;
    const highest = roller.keepHighest(count);
    
    expect(highest.length).toBe(count);
    const sortedResults = [...results].sort((a, b) => b.value - a.value);
    expect(highest).toEqual(sortedResults.slice(0, count));
  });
}); 