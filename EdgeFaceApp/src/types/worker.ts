export type WorkerStatus =
  | "KNOWN"
  | "TEMP"
  | "VISITOR"
  | "PENDING";

export interface Worker {

  workerId: string;

  name: string;

  role: string;

  site: string;

  status: WorkerStatus;

  embeddingId?: string;

}
