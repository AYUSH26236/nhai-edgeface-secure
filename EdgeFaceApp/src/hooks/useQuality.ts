import {
  useState,
} from 'react';

export function useQuality() {

  const [passed, setPassed] =
    useState(false);

  function evaluate(
    faces: any[],
  ) {

    setPassed(
      faces.length > 0,
    );
  }

  return {

    passed,

    evaluate,
  };
}