import {
  useState,
} from 'react';

export function useDetection() {

  const [faceCount, setFaceCount] =
    useState(0);

  function onFacesDetected(
    faces: any[],
  ) {

    setFaceCount(
      faces.length,
    );
  }

  return {

    faceCount,

    onFacesDetected,
  };
}
