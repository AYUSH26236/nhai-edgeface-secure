import { useState } from 'react';
import { RecognitionResult } from '../types/recognition';
import { recognizeFace } from '../services/edgeface';

const DEFAULT: RecognitionResult = { matched: false, confidence: 0 };

export function useRecognition() {
  const [result, setResult] = useState<RecognitionResult>(DEFAULT);
  const [loading, setLoading] = useState(false);

  async function recognize(faceImageBase64: string): Promise<RecognitionResult> {
    setLoading(true);
    try {
      const r = await recognizeFace(faceImageBase64);
      setResult(r);
      return r;
    } finally {
      setLoading(false);
    }
  }

  function reset() { setResult(DEFAULT); }

  return { result, loading, recognize, reset };
}