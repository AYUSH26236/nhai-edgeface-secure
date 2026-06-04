import { EnrollmentRequest } from '../types/enrollment';
import { Worker } from '../types/worker';
import { addWorker } from './workerStore';
import { logEvent } from './auditService';
import { extractFaceEmbedding } from './edgeface';

const enrollments: EnrollmentRequest[] = [];

export function getPendingEnrollments(): EnrollmentRequest[] {
  return enrollments.filter(e => e.status === 'PENDING_APPROVAL');
}

export async function createTempEnrollment(
  name: string,
  faceImageBase64: string,
  isVisitor = false,
): Promise<EnrollmentRequest> {
  const embedding = await extractFaceEmbedding(faceImageBase64);
  const request: EnrollmentRequest = {
    id: `ENROLL_${Date.now()}`,
    name,
    createdAt: Date.now(),
    status: 'PENDING_APPROVAL',
    embedding,
    isVisitor,
  };
  enrollments.push(request);
  logEvent('ENROLLMENT_START', { metadata: { name, isVisitor } });
  return request;
}

export function approveEnrollment(enrollmentId: string): Worker | null {
  const req = enrollments.find(e => e.id === enrollmentId);
  if (!req) return null;
  req.status = 'APPROVED';
  const worker: Worker = {
    id: `WORKER_${Date.now()}`,
    name: req.name,
    designation: req.isVisitor ? 'Visitor' : 'Temp Worker',
    department: 'Unknown',
    enrolledAt: Date.now(),
    embedding: req.embedding,
    photoUri: req.photoUri,
    syncStatus: 'PENDING',
  };
  addWorker(worker);
  logEvent('ENROLLMENT_COMPLETE', { workerId: worker.id });
  return worker;
}

export function rejectEnrollment(enrollmentId: string): void {
  const req = enrollments.find(e => e.id === enrollmentId);
  if (req) req.status = 'REJECTED';
}