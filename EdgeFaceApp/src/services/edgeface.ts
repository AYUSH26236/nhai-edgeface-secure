import { AuthResult } from '../types/auth';
import { Worker } from '../types/worker';
import { SyncResult } from '../types/sync';

export class EdgeFaceService {

  async authenticate(
    _image: string
  ): Promise<AuthResult> {

    console.log('Starting authentication');

    return {

      success: false,

      state: 'unknown',

      confidence: 0,

      workerId: undefined,

      message: 'No match found',

    };
  }

  async enrollWorker(
    _images: string[],
    worker: Worker
  ): Promise<void> {

    console.log(
      'Enrollment pending',
      worker
    );
  }

  async syncToAWS():
    Promise<SyncResult> {

    return {

      uploaded: 0,

      purged: 0,

      pending: 0,

      success: false,

    };
  }
}