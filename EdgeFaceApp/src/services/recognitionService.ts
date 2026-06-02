import { Worker } from '../types/worker';
import { RecognitionResult } from '../types/recognition';
import { THRESHOLDS } from '../config/thresholds';

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function matchEmbedding(query: number[], workers: Worker[]): RecognitionResult {
  if (!workers.length) return { matched: false, confidence: 0 };
  let best: Worker | null = null;
  let bestScore = -1;
  for (const w of workers) {
    const score = cosineSimilarity(query, w.embedding);
    if (score > bestScore) { bestScore = score; best = w; }
  }
  if (bestScore >= THRESHOLDS.recognition.matchThreshold && best) {
    return { matched: true, workerId: best.id, workerName: best.name, confidence: bestScore };
  }
  return { matched: false, confidence: bestScore };
}

// V2: replace with TFLite MobileFaceNet/EdgeFace
export function extractEmbedding(_unused: string): number[] {
  const dim = 128;
  const raw = Array.from({ length: dim }, () => Math.random() * 2 - 1);
  const norm = Math.sqrt(raw.reduce((s, v) => s + v * v, 0));
  return raw.map(v => v / norm);
}