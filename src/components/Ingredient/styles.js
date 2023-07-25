import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  padding: 0.2rem 1.2rem;
  background-color: ${({ isNew }) => (!isNew ? "transparent" : "#76797B")};
  color: ${({ theme }) => theme.COLORS.WHITE};
  border: ${({ theme, isNew }) =>
    isNew ? `2px dashed ${theme.COLORS.GRAY_300}` : "none"};
  border-radius: 8px;
  padding-right: 1rem;
  > Button {
    border: none;
    background: none;
  }
  .button-delete {
    color: ${({ theme }) => theme.COLORS.TEXT_NOTOK};
  }
  .button-add {
    color: ${({ theme }) => theme.COLORS.TEXT_OK};
  }
  > input {
    height: 20px;
    max-width: 8rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
    border: none;
    background: transparent;
    font-size: 1.2rem;
  }
`;
