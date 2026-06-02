import { Worker } from '../types/worker';

function mockEmbedding(seed: string): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) { hash = (hash << 5) - hash + seed.charCodeAt(i); hash |= 0; }
  const raw = Array.from({ length: 128 }, (_, i) => {
    const x = Math.sin(hash + i) * 43758.5453; return x - Math.floor(x);
  }).map(v => v * 2 - 1);
  const norm = Math.sqrt(raw.reduce((s, v) => s + v * v, 0));
  return raw.map(v => v / norm);
}

let workers: Worker[] = [
  { id: 'WORKER_001', name: 'Rajesh Kumar', designation: 'Site Engineer', department: 'Civil', enrolledAt: Date.now(), embedding: mockEmbedding('WORKER_001'), syncStatus: 'SYNCED' },
  { id: 'WORKER_002', name: 'Priya Sharma', designation: 'Safety Officer', department: 'HSE', enrolledAt: Date.now(), embedding: mockEmbedding('WORKER_002'), syncStatus: 'SYNCED' },
];

export const getAllWorkers = (): Worker[] => [...workers];
export const getWorkerById = (id: string): Worker | undefined => workers.find(w => w.id === id);
export const addWorker = (w: Worker): void => { workers.push(w); };
export const workerCount = (): number => workers.length;