import { GlobalStyle } from "./styled/globalStyle";
import { Typer } from "./components/Typer";
import { MissCounter } from "./components/MissCounter/MissCounter";

function App() {
  return (
    <>
      <GlobalStyle />
      <Typer />
      <div>
        <MissCounter />
      </div>
    </>
  );
}

export default App;
