import { useEffect, useState } from 'react';

import { FaceDetectionResult } from './types';

export function useFaceDetection() {
  const [faces, setFaces] = useState<
    FaceDetectionResult[]
  >([]);

  useEffect(() => {
    let x = 40;

    let direction = 1;

    const interval = setInterval(() => {
      x += direction * 12;

      if (x > 260) {
        direction = -1;
      }

      if (x < 20) {
        direction = 1;
      }

      const dynamicWidth =
        x > 180 ? 240 : 160;

      const mockFace: FaceDetectionResult = {
        bounds: {
          x,
          y: 220,
          width: dynamicWidth,
          height: dynamicWidth,
        },

        confidence: 0.98,

        yaw: 0,
        pitch: 0,
        roll: 0,
      };

      setFaces([mockFace]);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return {
    faces,
  };
}