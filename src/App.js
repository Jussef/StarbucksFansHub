import { ThemeProvider } from "@mui/material/styles";
import theme from "./Utils/theme";
import Home from "./Layouts/Home/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
