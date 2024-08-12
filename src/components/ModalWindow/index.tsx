import { StyledModal, StyledModalContainer } from "./style";

export const ModalWindow: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <StyledModalContainer>
      <StyledModal>
        <h4>Enter new text</h4>
        {children}
        <button onClick={() => window.close()}>Done</button>
      </StyledModal>
    </StyledModalContainer>
  );
};
