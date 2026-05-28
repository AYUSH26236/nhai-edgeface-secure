export class RecognitionService {

  async recognize(
    _image: string,
  ) {

    return {

      matched: true,

      confidence: 0.97,

      workerId: 'WORKER_001',

    };
  }
}