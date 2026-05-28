export interface QualityResult {
  isCentered: boolean;
  isTooSmall: boolean;
  isTooLarge: boolean;
  score: number;
  message: string;
}