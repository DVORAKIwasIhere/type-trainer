import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TEXT_REGEXP } from "../models/letter";
import { RootState } from "../store/store";
import {
  incrementCurrentLetterIndex,
  printLetter,
  validateKey,
} from "../store/typingSlice";

export const useHandleKey = (ignoreRefs: any[]) => {
  const dispatch = useDispatch();
  const currentLetterIndex = useSelector(
    (state: RootState) => state.typerSlice.currentLetterIndex
  );

  const typerItems = useSelector((state: RootState) => state.typerSlice.items);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key;

      const isAnyInputIgnored = ignoreRefs.some(
        (ref) => ref.current && ref.current === document.activeElement
      );

      console.log(isAnyInputIgnored)
      if (isAnyInputIgnored) {
        return;
      }

      if (TEXT_REGEXP.test(key) && currentLetterIndex < typerItems.length) {
        dispatch(printLetter(key));
        dispatch(validateKey());
        dispatch(incrementCurrentLetterIndex());
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => {
      removeEventListener("keydown", keyHandler);
    };
  }, [typerItems]);
  return useHandleKey;
};
