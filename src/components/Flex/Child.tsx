import React, { useMemo, ReactNode } from "react";
import withDefaults from "utils/with-defaults";
import { CSS } from "theme/stitches.config";
import { SimpleColors } from "utils/prop-types";
import { isNormalColor } from "utils/color";
import { ReactRef } from "utils/refs";
import { useDOMRef } from "utils/dom";
import { __DEV__ } from "utils/assertion";
import { FlexVariantsProps, StyledFlex } from "styles/flex.style";

type As = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export interface Props {
  tag: keyof JSX.IntrinsicElements;
  children?: ReactNode;
  bg?: SimpleColors | string;
  px?: string | number;
  py?: string | number;
  mx?: string | number;
  my?: string | number;
  m?: string | number;
  p?: string | number;
  fs?: string | number;
  justifyContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  alignContent:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch";
  gap: string | number;
  colGap: string | number;
  rowGap: string | number;
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap: "wrap" | "nowrap" | "wrap-reverse";
  // shadow: CanvasShadowStyles | string;
  css?: CSS;
  as?: As;
}

const defaultProps = {
  bg: "default" as SimpleColors | string,
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
      bg: userColor,
      justifyContent,
      alignItems,
      alignContent,
      gap,
      colGap,
      rowGap,
      flexWrap,
      flexDirection,
      m,
      p,
      px,
      py,
      mx,
      my,
      fs,
      css,
      ...otherProps
    } = props;

    const domRef = useDOMRef(ref);

    const color = useMemo(() => {
      if (isNormalColor(userColor)) {
        switch (userColor) {
          case "default":
            return "$text";
          default:
            return `$${userColor}`;
        }
      }
      return userColor;
    }, [userColor]);

    const fontSize = useMemo<string>(() => {
      if (!fs) return "inherit";
      if (typeof fs === "number") return `${fs}px`;
      return fs;
    }, [fs]);

    const margin = useMemo<string>(() => {
      if (!m) return "inherit";
      if (typeof m === "number") return `${m}px`;
      return m;
    }, [m]);

    const padding = useMemo<string>(() => {
      if (!p) return "inherit";
      if (typeof p === "number") return `${p}px`;
      return p;
    }, [p]);

    const marginX = useMemo<string>(() => {
      if (!mx) return "inherit";
      if (typeof mx === "number") return `${mx}px`;
      return mx;
    }, [mx]);

    const paddingX = useMemo<string>(() => {
      if (!px) return "inherit";
      if (typeof px === "number") return `${px}px`;
      return px;
    }, [px]);

    const marginY = useMemo<string>(() => {
      if (!my) return "inherit";
      if (typeof my === "number") return `${my}px`;
      return my;
    }, [my]);

    const paddingY = useMemo<string>(() => {
      if (!py) return "inherit";
      if (typeof py === "number") return `${py}px`;
      return py;
    }, [py]);

    return (
      <StyledFlex
        ref={domRef}
        as={tag}
        css={{
          backgroundColor: color ? color : "inherit",
          fontSize: fs ? fontSize : "",
          margin,
          padding,
          justifyContent,
          alignItems,
          alignContent,
          gap,
          colGap,
          rowGap,
          flexWrap,
          flexDirection,
          px: paddingX,
          py: paddingY,
          mx: marginX,
          my: marginY,
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
