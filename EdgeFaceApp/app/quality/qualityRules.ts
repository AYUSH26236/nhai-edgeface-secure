import { FaceDetectionResult } from '../detection/types';
import { QualityResult } from './types';

export function evaluateFaceQuality(
  face: FaceDetectionResult,
): QualityResult {
  const centerX =
    face.bounds.x + face.bounds.width / 2;

  const isCentered =
    centerX > 140 && centerX < 260;

  const isTooSmall =
    face.bounds.width < 120;

  const isTooLarge =
    face.bounds.width > 260;

  let score = 100;

  if (!isCentered) {
    score -= 30;
  }

  if (isTooSmall) {
    score -= 25;
  }

  if (isTooLarge) {
    score -= 25;
  }

  let message = 'Face OK';

  if (!isCentered) {
    message = 'Center your face';
  }

  if (isTooSmall) {
    message = 'Move closer';
  }

  if (isTooLarge) {
    message = 'Move back';
  }

  return {
    isCentered,
    isTooSmall,
    isTooLarge,
    score,
    message,
  };
}