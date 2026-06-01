import {
  useState,
} from 'react';

export function useRecognition() {

  const [
    workerId,
    setWorkerId,
  ] = useState<string | null>(
    null,
  );

  function recognize() {

    setWorkerId(
      'WORKER_001',
    );
  }

  return {

    workerId,

    recognize,
  };
}