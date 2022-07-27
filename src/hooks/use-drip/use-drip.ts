import { PressEvent } from "@react-types/shared";
import React, { useState } from "react";

const useDrip = (
  initialValue: boolean = false,
  ref: React.RefObject<HTMLElement>
): {
  visible: boolean;
  x: number;
  y: number;
  onClick: (event: React.MouseEvent<HTMLElement> | PressEvent) => void;
  onCompleted: () => void;
} => {
  const [dripVisible, setDripVisible] = useState<boolean>(initialValue);
  const [dripX, setDripX] = useState<number>(0);
  const [dripY, setDripY] = useState<number>(0);

  const dripCompletedHandle = () => {
    setDripVisible(false);
    setDripX(0);
    setDripY(0);
  };

  const clickHandler = (event: React.MouseEvent<HTMLElement> | PressEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDripVisible(true);
    if (event.type === "click") {
      setDripX(event.clientX - rect.left);
      setDripY(event.clientY - rect.top);
    }
  };

  return {
    visible: dripVisible,
    x: dripX,
    y: dripY,
    onClick: clickHandler,
    onCompleted: dripCompletedHandle,
  };
};

export default useDrip;
