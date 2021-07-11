const { findMissingInteger, insertNumber } = require("./missing-integer");

describe('findMissingNumber', () => {
  describe('basic cases', () => {
    test.each([
      {name: 'ordered',         seq: [1,2,3,4,6,7,8,9], answer:5 },
      {name: 'reverse ordered', seq: [9,8,7,6,4,3,2,1], answer:5 },
      {name: 'mixed',           seq: [9,1,7,2,3,4,8,6], answer:5 }
    ])('basic case $name', ({ seq, answer }) => {
      expect(findMissingInteger(seq)).toEqual(answer);
    })
  });
  // describe('edge cases');
  describe.skip('invalid cases', () => {
    test('multiple gaps', () => {
      expect(() => findMissingInteger([1,2,5,6,8,9]))
        .toThrow('Too many ranges found')
    })

    test('no gap', () => {
      expect(() => findMissingInteger([1,2,3,4,5,6,7,8,9]))
        .toThrow('Only one range found')
    })
  });
})

describe('insertNumber', () => {
  const fiveFive = { start: 5, end: 5 }
  const fiveSix = { start: 5, end: 6 }
  const fiveSeven = { start: 5, end: 7 }
  const sevenSeven = { start: 7, end: 7 }
  const sevenEight = { start: 7, end: 8 }
  const eightEight = { start: 8, end: 8 }
  const eightNine = { start: 8, end: 9 }

  describe('modify start', () => {
    test.each([
      {name: 'start', range: {...fiveFive}, subject: 6, result: fiveSix },
      {name: 'start plus', range: {...fiveSix}, subject: 7, result: fiveSeven },
      {name: 'between ranges', range: {...fiveFive, nextRange: eightEight }, subject: 6, result: {...fiveSix, nextRange: eightEight} },
      {name: 'join ranges', range: {...fiveFive, nextRange: {...sevenSeven} }, subject: 6, result: {...fiveSeven} },

    ])('insertNumber $name', ({ range, subject, result }) => {
      expect(insertNumber(range, subject)).toEqual(result)
    })
  })

  describe('modify next', () => {
    test.each([
      {name: 'start', range: {...fiveFive, nextRange: {...eightEight }}, subject: 7, result: {...fiveFive, nextRange: sevenEight} },
      {name: 'end of next', range: {...fiveFive, nextRange: {...eightEight }}, subject: 9, result: {...fiveFive, nextRange: eightNine} }
    ])('insertNumber $name', ({ range, subject, result }) => {
      expect(insertNumber(range, subject)).toEqual(result)
    })
  })

})
