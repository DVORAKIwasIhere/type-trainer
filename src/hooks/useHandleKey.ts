import { RefObject, useState } from "react";
import { useKeyHandler } from "./useKeyHandler";
import { useTypingMetrics } from "./useTypingMetrics";
import { useStartTimer } from "./useStartTimer";

export const useHandleKey = (ignoreRefs: RefObject<HTMLInputElement>[]) => {
  const [typedWords, setTypedWords] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useKeyHandler(ignoreRefs, setTypedWords, startTime, setStartTime);
  useStartTimer(setStartTime);
  const wpm = useTypingMetrics(typedWords, startTime);

  return { wpm };
};
