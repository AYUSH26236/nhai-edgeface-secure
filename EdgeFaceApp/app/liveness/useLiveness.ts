import { useEffect, useState } from 'react';

import {
  LivenessState,
} from './types';

import {
  getRandomChallenge,
  getChallengeInstruction,
} from './challengeEngine';

export function useLiveness() {
  const [liveness, setLiveness] =
    useState<LivenessState | null>(null);

  useEffect(() => {
    let mounted = true;

    function runChallengeCycle() {
      const challenge =
        getRandomChallenge();

      if (!mounted) {
        return;
      }

      setLiveness({
        currentChallenge: challenge,
        instruction:
          getChallengeInstruction(challenge),
        completed: false,
        failed: false,
        progress: 0,
        verified: false,
      });

      let progress = 0;

      const progressInterval =
        setInterval(() => {
          progress += 20;

          setLiveness(prev => {
            if (!prev) {
              return prev;
            }

            return {
              ...prev,
              progress,
            };
          });

          if (progress >= 100) {
            clearInterval(
              progressInterval,
            );

            setLiveness(prev => {
              if (!prev) {
                return prev;
              }

              return {
                ...prev,
                completed: true,
                verified: true,
              };
            });

            setTimeout(() => {
              runChallengeCycle();
            }, 1800);
          }
        }, 400);
    }

    runChallengeCycle();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    liveness,
  };
}