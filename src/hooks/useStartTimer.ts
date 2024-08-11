import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useStartTimer = (setStartTime: any) => {
  const currentLetterIndex = useSelector(
    (state: RootState) => state.typerSlice.currentLetterIndex
  );

  useEffect(() => {
    if (currentLetterIndex === 0) {
      setStartTime(Date.now());
    }
  }, [currentLetterIndex, setStartTime]);
};
