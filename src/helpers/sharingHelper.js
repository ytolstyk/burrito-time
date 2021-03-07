import { timeHelper } from './timeHelper';

const genericMessage = 'I need to eat a burrito, so I can track it with Eat-a-burrita!';
const staticMessages = [
  'I just ate a burrito, and it was delicious!',
  'Tracking my burritos has never been easier - thanks Eat-a-burrita!',
  'Are you up for some burritos?',
  'Give me a B! Give me a urrito! No, really, give me a burrito. Please.',
];

export const sharingHelper = {
  randomMessage(timestamp, count) {
    const timeMessage = timestamp === 0 ? genericMessage :
      `It's been ${timeHelper.count(Date.now(), timestamp)} since my last burrito. Maybe it's time!`;
    const countMessage = count === 0 ? genericMessage :
      `I had ${count} ${count === 1 ? 'burrito' : 'burritos'} while using Eat-a-burrita. Delicious!`;


    const messages = [
      countMessage,
      timeMessage,
      ...staticMessages,
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  },
};
