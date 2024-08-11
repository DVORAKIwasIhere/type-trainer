import { RefObject, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TEXT_REGEXP } from "../models/letter";
import { RootState } from "../store/store";
import {
  incrementCurrentLetterIndex,
  printLetter,
  validateKey,
} from "../store/typingSlice";

export const useKeyHandler = (
    ignoreRefs: RefObject<HTMLInputElement>[],
    setTypedWords: any,
    startTime: number | null,
    setStartTime: any
  ) => {
    const dispatch = useDispatch();
    const currentLetterIndex = useSelector(
      (state: RootState) => state.typerSlice.currentLetterIndex
    );
    const typerItems = useSelector((state: RootState) => state.typerSlice.items);
  
    useEffect(() => {
      const keyHandler = (e: KeyboardEvent) => {
        const key = e.key;
        const isAnyInputIgnored = ignoreRefs.some(
          (ref: { current: Element | null }) =>
            ref.current && ref.current === document.activeElement
        );
  
        if (isAnyInputIgnored) return;
  
        if (TEXT_REGEXP.test(key) && currentLetterIndex < typerItems.length) {
          if (currentLetterIndex === 0) {
            setStartTime(Date.now());
          } else if (
            typerItems[currentLetterIndex].expectedLetter === " " ||
            currentLetterIndex === typerItems.length - 1
          ) {
            setTypedWords((prev: number) => prev + 1);
          }
  
          dispatch(printLetter(key));
          dispatch(validateKey());
          dispatch(incrementCurrentLetterIndex());
        }
      };
  
      window.addEventListener("keydown", keyHandler);
      return () => {
        window.removeEventListener("keydown", keyHandler);
      };
    }, [
      typerItems,
      currentLetterIndex,
      ignoreRefs,
      startTime,
      setTypedWords,
      setStartTime,
      dispatch,
    ]);
  };