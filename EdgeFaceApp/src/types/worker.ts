export type WorkerStatus =
  | "KNOWN"
  | "TEMP"
  | "VISITOR"
  | "PENDING";

export interface Worker {
  id: string;
  name: string;
  designation: string;
  department: string;
  enrolledAt: number;
  embedding: number[];
  photoUri?: string;
  syncStatus: 'LOCAL' | 'SYNCED' | 'PENDING';
}