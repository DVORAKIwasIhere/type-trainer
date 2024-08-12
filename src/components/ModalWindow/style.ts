import styled from "styled-components";

export const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const StyledModal = styled.div`
  width: 80vw;
  max-width: 400px;
  border-radius: 0.5rem;
  padding: 2rem 1rem;
  text-align: center;
  background: grey;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 2px ;
  transform: scale(0.9);
  animation: popIn 0.3s ease-in-out;

  @keyframes popIn {
    from {
      transform: scale(0.7);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
