import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyles } from "./styles/themes/global";
import { Router } from "./router";

import { CycleContextProvider } from "./contexts/CyclesContext";



export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  );
}
