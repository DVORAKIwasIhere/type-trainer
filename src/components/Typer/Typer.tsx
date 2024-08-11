import { useEffect, useRef, useState } from "react";
import { StyledLetter } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { parseText } from "../../store/typingSlice";
import { useHandleKey } from "../../hooks/useHandleKey";
import { RootState } from "../../store/store";

export const Typer = () => {
  const typerItems = useSelector((state: RootState) => state.typerSlice.items);

  const dispatch = useDispatch();

  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const [testText, setTestText] = useState<string>(text);

  useEffect(() => {
    dispatch(parseText(testText));
  }, [testText]);

  const inputRef = useRef<HTMLInputElement>(null);
  const { wpm } = useHandleKey([inputRef]);

  return (
    <>
      <div>
        {typerItems.map((letter) => {
          return (
            <StyledLetter $status={letter.status} key={letter.id}>
              {letter.expectedLetter}
            </StyledLetter>
          );
        })}
      </div>
      <div>
        <input
          ref={inputRef}
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
        />
      </div>
      <div>{wpm}</div>
    </>
  );
};
