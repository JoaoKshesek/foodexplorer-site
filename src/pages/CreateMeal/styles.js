import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 10.4rem auto 7.2rem;
  grid-area: "header" "main" "footer";
`;

export const Main = styled.main`
  grid-area: "main";
  margin: 0 auto;
  width: 136.8rem;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 12.3rem;
`;

export const ButtonBack = styled.div`
  margin: 1.8rem 0;
  max-width: 136.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  > a {
    background-color: transparent;
    color: ${({ theme }) => theme.COLORS.GRAY};
    display: flex;
    align-items: center;
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 3.6rem;
  }
  > h2 {
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 4.48rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 136.8rem;
  label {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
  .uploadImage {
    #file {
      color: ${({ theme }) => theme.COLORS.GRAY_100};
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      cursor: pointer;
      .uploadImageSelect {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        border-radius: 8px;
        height: 4.8rem;
        width: 30rem;
        color: ${({ theme }) => theme.COLORS.WHITE};
        background-color: ${({ theme }) => theme.COLORS.DARK_GRAY};
      }
    }
    input[type="file"] {
      display: none;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  margin-bottom: 3.2rem;
  div {
    background-color: transparent;
  }
`;

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.COLORS.DARK_GRAY};
  margin-bottom: 4.8rem;
  margin-top: 10px;
  > label {
    margin-top: 3.2rem;
    width: 100%;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }

  > textarea {
    height: 17.2rem;
    width: 100%;
    padding: 1.4rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
    background: transparent;
    border-radius: 8px;
    resize: none;
    border: none;
  }
`;

export const IngredientsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
`;

export const SectionIngredients = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  width: 100%;
  height: 4.8rem;
  border-radius: 8px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.COLORS.DARK_GRAY};
`;

export const SendFormWithImage = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  > button {
    width: 40%;
  }
`;

export const Dropdown = styled.div`
  > select {
    width: 100%;
    height: 4.8rem;
    min-width: 300px;
    padding: 0 14px;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.COLORS.DARK_GRAY};
    color: ${({ theme }) => theme.COLORS.WHITE};
    margin-top: 5px;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;