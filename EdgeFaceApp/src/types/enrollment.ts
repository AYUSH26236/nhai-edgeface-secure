export type EnrollmentStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export interface EnrollmentRequest {
  id: string;
  name: string;
  createdAt: number;
  status: EnrollmentStatus;
  embedding: number[];
  photoUri?: string;
  isVisitor: boolean;
}