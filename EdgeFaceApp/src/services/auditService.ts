import {
 AuditLog
}
from "../types/audit";

export class AuditService {

 async log(
  event:AuditLog
 ):Promise<void>{

  console.log(
   "Audit",
   event
  );

 }

}

