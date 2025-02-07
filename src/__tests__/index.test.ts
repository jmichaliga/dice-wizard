import { DiceWizard, DieType } from '../index';

describe('DiceWizard', () => {
  let wizard: DiceWizard;

  beforeEach(() => {
    wizard = new DiceWizard();
  });

  describe('roll', () => {
    test('returns correct number of dice', () => {
      const count = 3;
      const dieType: DieType = 6;
      const results = wizard.roll(count, dieType);
      
      expect(results.length).toBe(count);
      results.forEach(result => {
        expect(result.dieType).toBe(dieType);
        expect(result.value).toBeGreaterThanOrEqual(1);
        expect(result.value).toBeLessThanOrEqual(dieType);
      });
    });

    test('handles string notation', () => {
      const result = wizard.roll('d20');
      expect(result.length).toBe(1);
      expect(result[0].dieType).toBe(20);
      expect(result[0].value).toBeGreaterThanOrEqual(1);
      expect(result[0].value).toBeLessThanOrEqual(20);

      const multipleResults = wizard.roll('3d6');
      expect(multipleResults.length).toBe(3);
      multipleResults.forEach(die => {
        expect(die.dieType).toBe(6);
        expect(die.value).toBeGreaterThanOrEqual(1);
        expect(die.value).toBeLessThanOrEqual(6);
      });
    });
  });

  test('getSum returns correct total', () => {
    const results = wizard.roll('3d6');
    const sum = wizard.getSum();
    const expectedSum = results.reduce((total, die) => total + die.value, 0);
    
    expect(sum).toBe(expectedSum);
  });

  test('keepValues filters correctly', () => {
    wizard.roll('5d6');
    const valuesToKeep = [1, 2];
    const filtered = wizard.keepValues(valuesToKeep);
    
    filtered.forEach(result => {
      expect(valuesToKeep).toContain(result.value);
    });
  });

  test('removeValues filters correctly', () => {
    wizard.roll('5d6');
    const valuesToRemove = [1, 2];
    const filtered = wizard.removeValues(valuesToRemove);
    
    filtered.forEach(result => {
      expect(valuesToRemove).not.toContain(result.value);
    });
  });

  test('keepHighest returns correct number of highest dice', () => {
    const results = wizard.roll('5d6');
    const count = 2;
    const highest = wizard.keepHighest(count);
    
    expect(highest.length).toBe(count);
    const sortedResults = [...results].sort((a, b) => b.value - a.value);
    expect(highest).toEqual(sortedResults.slice(0, count));
  });

  test('keepLowest returns correct number of lowest dice', () => {
    const results = wizard.roll('5d6');
    const count = 2;
    const lowest = wizard.keepLowest(count);
    
    expect(lowest.length).toBe(count);
    const sortedResults = [...results].sort((a, b) => a.value - b.value);
    expect(lowest).toEqual(sortedResults.slice(0, count));
  });
}); 