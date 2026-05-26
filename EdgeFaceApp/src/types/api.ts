import { AuthResult } from "./auth";
import { Worker } from "./worker";
import { SyncResult } from "./sync";

export interface EdgeFaceAPI {

 authenticate(
   image: string
 ): Promise<AuthResult>;

 enrollWorker(
   images: string[],
   worker: Worker
 ): Promise<void>;

 syncToAWS():
 Promise<SyncResult>;

}

