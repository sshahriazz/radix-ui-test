import { styled, VariantProps } from "theme/stitches.config";

export const Box = styled("div", {
  boxSizing: "border-box",
});
export type TextVariants = VariantProps<typeof Box>;
