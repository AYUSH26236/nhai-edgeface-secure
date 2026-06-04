export interface QualityResult {
  passed: boolean;
  blurScore: number;
  lightingScore: number;
  poseScore: number;
  failReasons: string[];
}