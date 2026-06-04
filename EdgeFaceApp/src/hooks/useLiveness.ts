import { useRef, useState } from 'react';
import { DetectedFace } from '../types/face';
import { LivenessChallenge } from '../types/liveness';
import {
  BlinkDetector,
  SmileDetector,
  HeadTurnDetector,
  pickRandomChallenge,
  getChallengeInstruction,
} from '../services/livenessService';

export function useLiveness() {
  const [challenge, setChallenge] = useState<LivenessChallenge | null>(null);
  const [instruction, setInstruction] = useState('');
  const [passed, setPassed] = useState(false);
  const [progress, setProgress] = useState(0);

  const blink = useRef(new BlinkDetector());
  const smile = useRef(new SmileDetector());
  const headTurn = useRef<HeadTurnDetector | null>(null);

  function startChallenge() {
    const c = pickRandomChallenge();
    blink.current.reset();
    smile.current.reset();
    if (c === 'TURN_LEFT') headTurn.current = new HeadTurnDetector('LEFT');
    else if (c === 'TURN_RIGHT') headTurn.current = new HeadTurnDetector('RIGHT');
    else headTurn.current = null;
    setChallenge(c);
    setInstruction(getChallengeInstruction(c));
    setPassed(false);
    setProgress(0);
  }

  function evaluateFrame(face: DetectedFace): boolean {
    if (!challenge) return false;
    let result = false;
    switch (challenge) {
      case 'BLINK': result = blink.current.update(face); break;
      case 'SMILE': result = smile.current.update(face); break;
      case 'TURN_LEFT':
      case 'TURN_RIGHT': result = headTurn.current?.update(face) ?? false; break;
    }
    setProgress(result ? 1 : 0.4);
    if (result) setPassed(true);
    return result;
  }

  function reset() {
    setChallenge(null);
    setInstruction('');
    setPassed(false);
    setProgress(0);
    blink.current.reset();
    smile.current.reset();
    headTurn.current = null;
  }

  return { challenge, instruction, passed, progress, startChallenge, evaluateFrame, reset };
}