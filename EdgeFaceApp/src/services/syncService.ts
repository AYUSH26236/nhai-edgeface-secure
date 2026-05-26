import {
 SyncResult
}
from "../types/sync";

export class SyncService {

 async sync():
 Promise<SyncResult>{

  return {

   uploaded:0,

   purged:0,

   pending:0,

   success:false

  };

 }

}
