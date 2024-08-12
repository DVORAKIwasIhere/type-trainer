import { RefObject, useState } from "react";
import { useKeyHandler } from "./useKeyHandler";
import { useTypingMetrics } from "./useTypingMetrics";

export const useHandleKey = (ignoreRefs: RefObject<HTMLInputElement>[]) => {


  useKeyHandler(ignoreRefs, typedWords, setTypedWords, startTime, setStartTime);
  const wpm = useTypingMetrics(typedWords, startTime);

  return { wpm, typedWords };
};
