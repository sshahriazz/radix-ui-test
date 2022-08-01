import React from 'react';
import {
    FocusScope,
    OverlayContainer,
    useDialog,
    useModal,
    useOverlay,
    usePreventScroll
} from 'react-aria';

import { useOverlayTriggerState } from 'react-stately';
import { Button } from './Button';

// Reuse the Button from your component library. See below for details.

function ModalDialog(props: any) {
    let { title, children } = props;

    // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.
    let ref = React.useRef(null);
    let { overlayProps, underlayProps } = useOverlay(
        props,
        ref
    );

    // Prevent scrolling while the modal is open, and hide content
    // outside the modal from screen readers.
    usePreventScroll();
    let { modalProps } = useModal();

    // Get props for the dialog and its title
    let { dialogProps, titleProps } = useDialog(props, ref);

    return (
        <div
            style={{
                position: 'fixed',
                zIndex: 100,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            {...underlayProps}
        >
            <FocusScope contain restoreFocus autoFocus>
                <div
                    {...overlayProps}
                    {...dialogProps}
                    {...modalProps}
                    ref={ref}
                    style={{
                        background: 'white',
                        color: 'black',
                        padding: 30
                    }}
                >
                    <h3
                        {...titleProps}
                        style={{ marginTop: 0 }}
                    >
                        {title}
                    </h3>
                    {children}
                </div>
            </FocusScope>
        </div>
    );
}

export function Example() {
    let state = useOverlayTriggerState({});

    return (
        <>
            <Button onPress={state.open}>Open Dialog</Button>
            {state.isOpen &&
                (
                    <OverlayContainer>
                        <ModalDialog
                            title="Enter your name"
                            isOpen
                            onClose={state.close}
                            isDismissable
                        >
                            <form
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <label htmlFor="first-name">
                                    First Name:
                                </label>
                                <input id="first-name" />
                                <label htmlFor="last-name">Last Name:
                                </label>
                                <input id="last-name" />
                                <Button
                                    onPress={state.close}
                                    style={{ marginTop: 10 }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </ModalDialog>
                    </OverlayContainer>
                )}
        </>
    );
}

