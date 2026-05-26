import { Worker } from "../types/worker";

export class EnrollmentService {

 async enroll(
  images:string[],

  worker:Worker

 ):Promise<boolean>{

  console.log(
   "Enroll request",
   worker
  );

  return true;

 }

}
