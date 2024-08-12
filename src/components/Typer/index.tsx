import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledLetter,
  WPMDisplay,
} from "./styles";
import {
  incrementCurrentLetterIndex,
  parseText,
  printLetter,
  validateKey,
} from "@/store/typingSlice";
// import { useHandleKey } from "@/hooks/useHandleKey";
import { RootState } from "@/store/store";
import { TEXT_REGEXP } from "@/utils/constants";
import { ModalWindow } from "../ModalWindow";
import { closeModal, openModal } from "@/store/modalWindowSlice";

export const Typer = () => {
  const { isOpen } = useSelector((store: RootState) => store.modalWindowSlice);
  const typerItems = useSelector((state: RootState) => state.typerSlice.items);
  const currentLetterIndex = useSelector(
    (state: RootState) => state.typerSlice.currentLetterIndex
  );

  const dispatch = useDispatch();

  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const [testText, setTestText] = useState<string>(text);
  const [isHovered, setIsHovered] = useState(false);
  const [typedWords, setTypedWords] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [WPM, setWPM] = useState(0);

  useEffect(() => {
    dispatch(parseText(testText));
    setStartTime(null);
    setTypedWords(0);
  }, [testText]);

  // const inputRef = useRef<HTMLInputElement>(null);
  // const { wpm } = useHandleKey([inputRef]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWPM = () => {
    if (startTime && currentLetterIndex < typerItems.length) {
      setWPM(Math.round(typedWords / ((Date.now() - startTime) / 1000 / 60)));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;

    if (TEXT_REGEXP.test(key) && currentLetterIndex < typerItems.length) {
      if (currentLetterIndex === 0) {
        setStartTime(Date.now());
      }
      dispatch(printLetter(key));
      dispatch(validateKey());

      if (typerItems[currentLetterIndex].expectedLetter === " ") {
        setTypedWords((prev: number) => {
          const newTypedWords = prev + 1;
          return newTypedWords;
        });
      }

      dispatch(incrementCurrentLetterIndex());
    }
    if (currentLetterIndex === typerItems.length - 1) {
      setTypedWords((prev: number) => {
        const newTypedWords = prev + 1;
        return newTypedWords;
      });
      setStartTime(Date.now);
    }
    handleWPM();
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseModal]);

  return (
    <>
      <StyledContainer
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        $isHovered={isHovered}
      >
        {typerItems.map((letter) => {
          return (
            <StyledLetter $status={letter.status} key={letter.id}>
              {letter.expectedLetter}
            </StyledLetter>
          );
        })}
      </StyledContainer>
      <StyledButton onClick={() => dispatch(openModal())}>Open Modal</StyledButton>
      {isOpen && (
        <ModalWindow>
          <div ref={modalRef}>
            <StyledInput
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
            />
          </div>
        </ModalWindow>
      )}
      <WPMDisplay>{"Words per minute: " + WPM}</WPMDisplay>
    </>
  );
};
