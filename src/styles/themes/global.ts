import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:focus {
  outline: 0;
  border: 0 0 0 2px ${(props) => props.theme["green_500"]};
}

body{
  background: ${(props) => props.theme["gray_900"]};
  color: ${(props) => props.theme["gray_300"]};
}

body, input textarea, button {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 400;
}
`;
