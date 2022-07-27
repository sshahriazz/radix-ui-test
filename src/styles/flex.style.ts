import { styled, VariantProps } from "theme/stitches.config";

export const StyledFlex = styled("div", {
  display: "flex",
});
export type FlexVariantsProps = VariantProps<typeof StyledFlex>;
