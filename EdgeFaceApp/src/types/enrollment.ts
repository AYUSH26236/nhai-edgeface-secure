export type ApprovalState =

 | "PENDING"

 | "APPROVED"

 | "REJECTED";

export type EnrollmentSource =

 | "LOCAL"

 | "DATALAKE"

 | "IMPORT";

export interface Enrollment {

 workerId:string;

 approvalState: ApprovalState;

 source: EnrollmentSource;

 supervisorId?:string;

 enrollmentTime:string;

 operatorId:string;

}
