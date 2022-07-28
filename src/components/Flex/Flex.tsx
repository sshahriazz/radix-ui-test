import React, { ReactNode, useMemo } from "react";
import withDefaults from "utils/with-defaults";
import { ReactRef } from "utils/refs";
import { useDOMRef } from "utils/dom";
import { __DEV__ } from "utils/assertion";
import { FlexChild, FlexChildProps } from "./Child";

export interface Props {
  children?: ReactNode;
}

const defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  b: false,
  div: false,
  small: false,
  i: false,
  span: false,
  del: false,
  em: false,
  blockquote: false,
};

type ElementMap = { [key in keyof JSX.IntrinsicElements]?: boolean };

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type FlexProps = Props &
  typeof defaultProps &
  NativeAttrs &
  Omit<FlexChildProps, keyof Props | "tag">;
type FlexRenderableElements = Array<keyof JSX.IntrinsicElements>;

const getModifierChild = (
  tags: FlexRenderableElements,
  children: ReactNode
) => {
  if (!tags.length) return children;
  const nextTag = tags.slice(1, tags.length);
  return (
    <FlexChild tag={tags[0]}>{getModifierChild(nextTag, children)}</FlexChild>
  );
};

export const Flex = React.forwardRef(
  (props: FlexProps, ref: ReactRef<HTMLElement>) => {
    const {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      div,
      b,
      small,
      i,
      span,
      del,
      em,
      blockquote,
      children,
      ...otherProps
    } = props;

    const domRef = useDOMRef(ref);

    const elements: ElementMap = { div, h1, h2, h3, h4, h5, h6, blockquote };
    const inlineElements: ElementMap = { span, small, b, em, i, del };
    const names = Object.keys(elements).filter(
      //@ts-ignore
      (name: keyof JSX.IntrinsicElements) => elements[name]
    ) as FlexRenderableElements;
    const inlineNames = Object.keys(inlineElements).filter(
      //@ts-ignore
      (name: keyof JSX.IntrinsicElements) => inlineElements[name]
    ) as FlexRenderableElements;

    const tag = useMemo(() => {
      if (names[0]) return names[0];
      if (inlineNames[0]) return inlineNames[0];
      return "div" as keyof JSX.IntrinsicElements;
    }, [names, inlineNames]);

    const renderableChildElements = inlineNames.filter(
      (name: keyof JSX.IntrinsicElements) => name !== tag
    ) as FlexRenderableElements;

    const modifers = useMemo(() => {
      if (!renderableChildElements.length) return children;
      return getModifierChild(renderableChildElements, children);
    }, [renderableChildElements, children]);

    return (
      <FlexChild ref={domRef} tag={tag} {...otherProps}>
        {modifers}
      </FlexChild>
    );
  }
);

if (__DEV__) {
  Flex.displayName = "Trident.Flex";
}

Flex.toString = () => ".trident-flex";

const MemoFlex = React.memo(Flex);

export default withDefaults(MemoFlex, defaultProps);
