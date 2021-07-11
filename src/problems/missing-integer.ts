type Range = {
  prevRange?: Range;
  start: number;
  end: number;
  nextRange?: Range;
};

const findGapIn = (startRange: Range): number => {
  console.dir(startRange)
  if (startRange.nextRange === undefined) {
    throw new Error('Only one range found')
  } else {
    const next = startRange.nextRange;

    if (next.start > startRange.end + 2) {
      throw new Error('Gap is too big')
    }

    if (next.nextRange !== undefined) {
      throw new Error('Too many ranges found')
    }

    return startRange.end + 1;
  }

  return 0;
}

export const insertNumber = (startRange: Range, subject: number): Range => {
  let currentRange: Range | undefined = startRange
  let nextRange = currentRange.nextRange;
  let foundMatch = false
  while (currentRange && !foundMatch) {
    if (subject < currentRange.start) {
      if (subject === currentRange.start - 1) {
        // extend the current range
        // console.log('extend down')
        currentRange.start = currentRange.start - 1
        foundMatch = true;
      } else {
        const newNext = {
          ...currentRange
        }
        currentRange.start = subject
        currentRange.end = subject
        currentRange.nextRange = newNext
        foundMatch = true
      }
    } else {
      // subject is above current range
      if (subject === currentRange.end + 1) {
        if (nextRange !== undefined && nextRange.start === subject + 1) {
          // join the 2 ranges
          // console.log('join')
          currentRange.end = nextRange.end
          currentRange.nextRange = nextRange.nextRange
          foundMatch = true;
        } else {        
          // extend the current range
          // console.log('extend 1')
          currentRange.end = currentRange.end + 1
          foundMatch = true;
        }
      } else if (currentRange.nextRange === undefined) {
        // create a new distant range
        // console.log('new end')
        currentRange.nextRange = {
          start: subject,
          end: subject
        }
        foundMatch = true
      }
    }

    currentRange = currentRange.nextRange
  }

  // console.dir(startRange)
  return startRange;
}

const buildRanges = (sequence: number[]): Range => {
  const firstRange = {
    start: 0,
    end: 0
  }

  for (let i = 0; i < sequence.length; i++) {
    insertNumber(firstRange, sequence[i])  
  }

  return firstRange;
}

export const findMissingInteger = (sequence: number[]): number => {
  const ranges = buildRanges(sequence);
  return findGapIn(ranges);
}
