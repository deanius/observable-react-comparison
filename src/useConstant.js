import React from "react";

export const useConstant = (fn) => {
  const ref = React.useRef(null);
  if (ref.current == null) {
    ref.current = { value: fn() };
  }
  return ref.current.value;
};
