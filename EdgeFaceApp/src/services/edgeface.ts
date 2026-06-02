// EdgeFace / MobileFaceNet integration layer
// V1: uses cosine similarity with mock embeddings
// V2: replace extractEmbedding with real TFLite inference

import { Worker } from '../types/worker';
import { RecognitionResult } from '../types/recognition';
import { matchEmbedding, cosineSimilarity } from './recognitionService';
import { getAllWorkers } from './workerStore';

// V2: load TFLite model and run inference on face crop
// import { runModel } from './tfliteRunner';

export async function extractFaceEmbedding(_faceImageBase64: string): Promise<number[]> {
  // TODO V2: return await runModel(_faceImageBase64);
  // V1: return normalized random vector (demo only)
  const dim = 128;
  const raw = Array.from({ length: dim }, () => Math.random() * 2 - 1);
  const norm = Math.sqrt(raw.reduce((s, v) => s + v * v, 0));
  return raw.map(v => v / norm);
}

export async function recognizeFace(faceImageBase64: string): Promise<RecognitionResult> {
  const embedding = await extractFaceEmbedding(faceImageBase64);
  const workers = getAllWorkers();
  return matchEmbedding(embedding, workers);
}

export async function enrollFace(
  images: string[],
  worker: Worker,
): Promise<number[]> {
  // Average embeddings from multiple enrollment images for robustness
  const embeddings = await Promise.all(images.map(extractFaceEmbedding));
  const avg = embeddings[0].map((_, i) =>
    embeddings.reduce((sum, e) => sum + e[i], 0) / embeddings.length
  );
  const norm = Math.sqrt(avg.reduce((s, v) => s + v * v, 0));
  return avg.map(v => v / norm);
}

export function embeddingSimilarity(a: number[], b: number[]): number {
  return cosineSimilarity(a, b);
}