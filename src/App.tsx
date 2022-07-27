import Button from "components/Button/button";
import Text from "components/Text/Text";
import { useState } from "react";
import { createTheme } from "theme/stitches.config";
import ThemeProvider from "theme/theme-provider";

function App() {
  const dark = createTheme({
    type: "dark",
  });
  const light = createTheme({
    type: "light",
  });
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Text
        margin={10}
        size={50}
        h1
        css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%" }}
      >
        Hello POlash is nice
      </Text>
      <Button color={"success"} size={"sm"} auto shadow>
        Button
      </Button>
      <Button onPress={() => setIsDark((dark) => !dark)}>Button</Button>
      <Button flat>Button</Button>
      <Button>Button</Button>
      <Button shadow>Button</Button>
    </ThemeProvider>
  );
}

export default App;
