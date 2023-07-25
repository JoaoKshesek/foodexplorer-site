import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
  > label {
    width: 100%;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
  > input {
    height: 4.8rem;
    width: 100%;
    padding: 1.2rem 1.4rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
    background: ${({ theme }) => theme.COLORS.DARK_GRAY};
    border-radius: 8px;
    border: none;
  }
`;
