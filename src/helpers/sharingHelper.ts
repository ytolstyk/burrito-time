import { timeHelper } from './timeHelper';

const APP_NAME = 'Eat-a-Burrita';

const genericMessage = `I need to eat a burrito, so I can track it with ${APP_NAME}!`;
const staticMessages = [
  'I just ate a burrito, and it was delicious!',
  `Tracking my burritos has never been easier - thanks ${APP_NAME}!`,
  'Are you up for some burritos?',
  'Give me a B! Give me a urrito! No, really, give me a burrito. Please.',
];

export function randomMessage(timestamp: number, count: number) {
  const timeMessage = timestamp === 0 ? genericMessage :
    `It's been ${timeHelper.count(Date.now(), timestamp)} since my last burrito according to ${APP_NAME}. Maybe it's time for another!`;
  const countMessage = count === 0 ? genericMessage :
    `I had ${count} ${count === 1 ? 'burrito' : 'burritos'} while using ${APP_NAME}. Delicious!`;

  const messages = [
    countMessage,
    timeMessage,
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}
