import {
  AuthResult,
} from '../types/auth';

import { DetectionService } 
from '../services/detectionService';
import { QualityService }
from '../services/qualityService';

import { LivenessService }
from '../services/livenessService';

import { RecognitionService }
from '../services/recognitionService';

const detectionService =
  new DetectionService();

const qualityService =
  new QualityService();

const livenessService =
  new LivenessService();

const recognitionService =
  new RecognitionService();

export async function runAuthPipeline(
  image: string,
): Promise<AuthResult> {

  try {

    console.log(
      'STEP 1 — DETECTION',
    );

    const detection =
      await detectionService
        .detectFace(image);

    if (!detection.faceDetected) {

      return {

        success: false,

        state: 'detecting',

        message:
          'No face detected',
      };
    }

    console.log(
      'STEP 2 — QUALITY',
    );

    const quality =
      await qualityService
        .checkQuality(image);

    if (!quality.passed) {

      return {

        success: false,

        state: 'quality_check',

        message:
          'Quality failed',
      };
    }

    console.log(
      'STEP 3 — LIVENESS',
    );

    const liveness =
      await livenessService
        .checkLiveness(image);

    if (
      !liveness.challengePass
    ) {

      return {

        success: false,

        state: 'liveness',

        message:
          'Liveness failed',
      };
    }

    console.log(
      'STEP 4 — RECOGNITION',
    );

    const recognition =
      await recognitionService
        .recognize(image);

    if (!recognition.matched) {

      return {

        success: false,

        state: 'unknown',

        message:
          'Unknown person',
      };
    }

    return {

      success: true,

      state:
        'authenticated',

      confidence:
        recognition.confidence,

      workerId:
        recognition.workerId,

      message:
        'Authentication successful',
    };

  } catch (error) {

    console.error(error);

    return {

      success: false,

      state: 'failed',

      message:
        'Pipeline crashed',
    };
  }
}