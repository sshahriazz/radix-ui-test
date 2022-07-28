import React, { useMemo, ReactNode } from "react";
import withDefaults from "utils/with-defaults";
import { CSS } from "theme/stitches.config";
import { ReactRef } from "utils/refs";
import { useDOMRef } from "utils/dom";
import { __DEV__ } from "utils/assertion";
import { FlexVariantsProps, StyledFlex } from "styles/flex.style";

type As = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  fs?: string | number;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch";
  gap?: string | number;
  colGap?: string | number;
  rowGap?: string | number;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  // shadow: CanvasShadowStyles | string;
  css?: CSS;
  as?: As;
}

const defaultProps = {
  tag: "div",
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type FlexChildProps = Props &
  typeof defaultProps &
  NativeAttrs &
  FlexVariantsProps;

export const FlexChild = React.forwardRef(
  (props: FlexChildProps, ref: ReactRef<HTMLElement>) => {
    const {
      children,
      tag,
      justifyContent,
      alignItems,
      alignContent,
      gap,
      colGap,
      rowGap,
      flexWrap,
      flexDirection,
      fs,
      css,
      ...otherProps
    } = props;

    const domRef = useDOMRef(ref);

    const fontSize = useMemo<string>(() => {
      if (!fs) return "inherit";
      if (typeof fs === "number") return `${fs}px`;
      return fs;
    }, [fs]);

    return (
      <StyledFlex
        ref={domRef}
        as={tag}
        css={{
          fontSize: fs ? fontSize : "",
          justifyContent,
          alignItems,
          alignContent,
          gap,
          columnGap: colGap,
          rowGap,
          flexWrap,
          flexDirection,
          ...(css as any),
        }}
        {...otherProps}
      >
        {children}
      </StyledFlex>
    );
  }
);

if (__DEV__) {
  FlexChild.displayName = "Trident.FlexChild";
}

FlexChild.toString = () => ".trident-flex-child";

const MemoFlexChild = React.memo(FlexChild);

export default withDefaults(MemoFlexChild, defaultProps);
