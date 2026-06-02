import {
  useState,
} from 'react';

export function useLiveness() {

  const [
    challengePassed,
    setChallengePassed,
  ] = useState(false);

  function process(
    faces: any[],
  ) {

    if (
      faces.length > 0
    ) {

      setChallengePassed(
        true,
      );
    }
  }

  return {

    challengePassed,

    process,
  };
}