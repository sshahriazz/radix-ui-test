import Button from "components/Button/button";
import Flex from "components/Flex/Flex";
import Text from "components/Text/Text";
import { useState } from "react";
import { Box } from "styles/box.style";
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
        size={50}
        h1
        css={{ textGradient: "45deg, $yellow600 -20%, $red600 100%" }}
      >
        Trident Design System Testing & Development
      </Text>
      <Flex
        // gap="$md"
        colGap={"$10"}
        rowGap={"$5"}
        flexWrap="wrap"
        flexDirection="row"
        css={{
          "@xs": { px: "$md" },
          "@lg": { py: "$18" },
        }}
      >
        <Button as="a" href="/hello" color="success" size="sm" shadow>
          Button
        </Button>
        <Button onPress={() => setIsDark((dark) => !dark)}>Button</Button>
        <Button flat>Button</Button>
        <Button>Button</Button>
        <Button shadow>Button</Button>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
