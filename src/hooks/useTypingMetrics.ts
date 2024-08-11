import { useEffect, useState } from "react";

export const useTypingMetrics = (typedWords: number, startTime: any) => {
  const [wpm, setWpm] = useState(0);
  const [initialTypedWords, setInitialTypedWords] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (startTime) {
      setInitialTypedWords(typedWords);
      interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000 / 60;
        if (elapsedTime > 0) {
          if (typedWords === initialTypedWords) {
            clearInterval(interval);
          } else {
            setWpm(Math.round(typedWords / elapsedTime));
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime, typedWords]);

  return wpm;
};
