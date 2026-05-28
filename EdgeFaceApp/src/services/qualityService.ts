export class QualityService {

  async checkQuality(
    _image: string,
  ) {

    return {

      passed: true,

      blurScore: 0.95,

      lightingScore: 0.92,

    };
  }
}