import { AuthResult } from "../types/auth";
import { Worker } from "../types/worker";
import { SyncResult } from "../types/sync";

export class EdgeFaceService {

 async authenticate(
  image:string
 ):Promise<AuthResult>{

  return {

   matched:false,

   workerId:"",

   workerName:"",

   confidence:0,

   livenessPass:false,

   decision:"UNKNOWN",

   timestamp:new Date()
    .toISOString()

  };

 }

 async enrollWorker(
  images:string[],

  worker:Worker

 ):Promise<void>{

  console.log(
   "Enrollment pending",
   worker
  );

 }

 async syncToAWS():

 Promise<SyncResult>{

  return {

   uploaded:0,

   purged:0,

   pending:0,

   success:false

  };

 }

}
