const { findMissingInteger } = require("./missing-integer");

describe('basic cases', () => {
  test.each([
    {name: 'ordered', seq: [1,2,3,4,6,7,8,9], answer:5 }
  ])('basic case $name', ({ seq, answer }) => {
    expect(findMissingInteger(seq)).toBe(answer);
  })
});
// describe('edge cases');
// describe('invalid cases');
