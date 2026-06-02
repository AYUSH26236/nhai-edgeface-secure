import { useEffect, useState } from 'react';
import { authPipeline, PipelineState } from '../workflow/authPipeline';
import { DetectedFace } from '../types/face';

const INITIAL: PipelineState = {
  authState: 'IDLE',
  faceCount: 0,
  livenessProgress: 0,
  statusMessage: 'Initializing...',
};

export function usePipeline() {
  const [state, setState] = useState<PipelineState>(INITIAL);

  useEffect(() => {
    const unsub = authPipeline.subscribe(setState);
    authPipeline.reset();
    return unsub;
  }, []);

  return {
    pipelineState: state,
    processFrame: (faces: DetectedFace[]) => authPipeline.processFrame(faces),
    reset: () => authPipeline.reset(),
  };
}