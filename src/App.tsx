import Text from "components/Text/Text";
import { useEffect, useState } from "react";
import { OverlayProvider } from "react-aria";
import { createTheme } from "theme/stitches.config";
import ThemeProvider from "theme/theme-provider";
import { Example } from "trash/Dialog";

function App() {
  const dark = createTheme({
    type: "dark",
  });
  const light = createTheme({
    type: "light",
  });
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(true);
  }, [])
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Text h1>Hello Text</Text>
      <OverlayProvider>
        <Example />
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default App;
