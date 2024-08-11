import styled from "styled-components";
import { LetterStatus } from "../../models/letter";

export const StyledLetter = styled.span<{ $status: LetterStatus }>`
  background-color: ${(props) => {
    if (props.$status === LetterStatus.Correct) {
      return "green";
    }
    if (props.$status === LetterStatus.Wrong) {
      return "red";
    }
    return "white";
  }};
`;
//(props.status === LetterStatus.Correct && LetterStatus.Absent ? 'green' : 'red')
