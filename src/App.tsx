import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import {
  incrementCurrentLetterIndex,
  parseText,
  printLetter,
  validateKey,
} from "./store/typingSlice";
import { StyledLetter } from "./styled";

function App() {
  const typerItems = useSelector((state: RootState) => state.typerSlice.items);
  const currentLetterIndex = useSelector(
    (state: RootState) => state.typerSlice.currentLetterIndex
  );
  const dispatch = useDispatch();

  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const [testText, setTestText] = useState<string>(text);

  useEffect(() => {
    dispatch(parseText(testText));
  }, [testText]);

  const TEXT_REGEXP = /^[А-Яа-яA-Za-z\s.,!?-]$/;

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key;
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

  return (
    <>
      <div>
        {typerItems.map((letter) => {
          return (
            <StyledLetter status={letter.status} key={letter.id}>
              {letter.expectedLetter}
            </StyledLetter>
          );
        })}
      </div>
    </>
  );
}

export default App;
