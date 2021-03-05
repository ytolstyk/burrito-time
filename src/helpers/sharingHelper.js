const messages = [
  'I just ate a burrito, and it was delicious!',
  'Tracking my burritos has never been easier - thanks Eat-a-burrita!',
  'Are you up for some burritos?',
  'Give me a B! Give me a urrito! No, really, give me a burrito. Please.',
];

export const sharingHelper = {
  randomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
  },
};
