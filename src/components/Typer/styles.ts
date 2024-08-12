import styled from "styled-components";
import { LetterStatus } from "../../models/letter";

export const StyledLetter = styled.span<{ $status: LetterStatus }>`
  background: ${(props) => {
    if (props.$status === LetterStatus.Correct) {
      return "linear-gradient(135deg, #a8e063, #56ab2f)";
    }
    if (props.$status === LetterStatus.Wrong) {
      return "linear-gradient(135deg, #ff6b6b, #c0392b)";
    }
    return "linear-gradient(135deg, #f0f0f0, #ffffff)";
  }};
  font-weight: ${(props) => {
    if (props.$status === LetterStatus.Correct) {
      return "normal";
    }
    if (props.$status === LetterStatus.Wrong) {
      return "normal";
    }
    return "bold";
  }};
  color: ${(props) => (props.$status === LetterStatus.Correct || props.$status === LetterStatus.Wrong ? "white" : "black")};
  margin-right: 4px;
  font-size: 20px;
  display: inline-block;
  position: relative;
  padding: 2px 6px;
  border-radius: 4px;

  transition: all 0.3s ease;
`;

export const StyledContainer = styled.div<{ $isHovered: boolean }>`
  outline: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
  height: 40%;
  margin: 10px auto; 
  background-color: #fff;
  transition: filter 0.3s ease, background-color 0.3s ease;
  filter: ${(props) => (props.$isHovered ? 'none' : 'blur(4px)')};
`;

export const HoveredStatus = styled.div`
margin-bottom: 10px;
  font-size: 14px;
  color: #666;

  &:hover ~ ${StyledContainer} {
    filter: blur(4px);
  }
`;

export const WPMDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  background-color: var(--clr-primary);
  color: var(--clr-white);
  background-color:gray;
  border-radius: 4px;
  border: 2px solid gray; 
  padding: 0.75rem 1.5rem;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color:gray;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--clr-primary-light);
  }
`;