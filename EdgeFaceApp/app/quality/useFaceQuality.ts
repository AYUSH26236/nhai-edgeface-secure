import { useMemo } from 'react';

import { FaceDetectionResult } from '../detection/types';

import { evaluateFaceQuality } from './qualityRules';

export function useFaceQuality(
  face: FaceDetectionResult | null,
) {
  return useMemo(() => {
    if (!face) {
      return null;
    }

    return evaluateFaceQuality(face);
  }, [face]);
}