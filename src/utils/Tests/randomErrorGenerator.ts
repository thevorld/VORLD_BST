// src/utils/randomErrorGenerator.ts

export const RandomErrorGenerator = () => {
    // Randomly decide to throw an error
    if (Math.random() < 0.5) { // 50% chance to throw an error
      throw new Error('Random error occurred');
    }
  };
  