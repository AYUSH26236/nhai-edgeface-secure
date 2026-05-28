import {
  LivenessChallenge,
} from './types';

const challenges: LivenessChallenge[] = [
  'BLINK',
  'TURN_LEFT',
  'TURN_RIGHT',
  'SMILE',
];

export function getRandomChallenge():
  LivenessChallenge {

  const index = Math.floor(
    Math.random() * challenges.length,
  );

  return challenges[index];
}

export function getChallengeInstruction(
  challenge: LivenessChallenge,
): string {

  switch (challenge) {
    case 'BLINK':
      return 'Blink your eyes';

    case 'TURN_LEFT':
      return 'Turn your head left';

    case 'TURN_RIGHT':
      return 'Turn your head right';

    case 'SMILE':
      return 'Smile naturally';

    default:
      return 'Follow instruction';
  }
}