import { FocusRingAria } from '@react-aria/focus';
import { AriaBaseButtonProps } from '@react-types/button';
import { PressEvents, FocusableProps } from '@react-types/shared';
import React from 'react';
import { mergeProps, useButton, useFocusRing, useHover } from 'react-aria';
import { CSS, styled, VariantProps } from 'theme/stitches.config';
import { useDOMRef } from 'utils/dom';

export const StyledButton = styled('button', {

})

export type ButtonVariantProps = VariantProps<typeof StyledButton>;

interface Props extends PressEvents, AriaBaseButtonProps, FocusableProps {
    children?: React.ReactNode;
    disabled?: boolean;
    as?: keyof JSX.IntrinsicElements;
}
type NativeAttrs = Omit<React.ButtonHTMLAttributes<unknown>, keyof Props>;
interface IFocusRingAria extends FocusRingAria {
    focusProps: Omit<React.HTMLAttributes<HTMLElement>, keyof ButtonProps>;
}
export type ButtonProps = Props & NativeAttrs & Omit<ButtonVariantProps, 'isPressed' | 'isHovered' | 'isChildLess'> & { css?: CSS }

export const Button = React.forwardRef(({
    as,
    css,
    children,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    disabled,
    autoFocus,
    onPressUp,
    ...btnProps
}: ButtonProps, ref: React.Ref<HTMLButtonElement | null>) => {
    // const { children, css, disabled, autoFocus, ...rest } = props;
    let btnRef = useDOMRef(ref);
    let { buttonProps, isPressed } = useButton({
        ...btnProps,
        isDisabled: disabled,
        elementType: as,
        onPress,
        onPressStart,
        onPressEnd,
        onPressChange,
        onPressUp,
    } as AriaBaseButtonProps, btnRef);
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { isFocused, isFocusVisible, focusProps }: IFocusRingAria = useFocusRing({ autoFocus });
    console.log("Focus", isFocused, "Visibility", isFocusVisible, "Hover", isHovered, "Preesed?", isPressed);

    return (
        <StyledButton as={as} css={css} {...mergeProps(buttonProps, hoverProps, focusProps, btnProps)} ref={btnRef}>
            {children}
        </StyledButton>
    );
})