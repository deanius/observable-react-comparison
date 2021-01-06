import { useState, useRef, useEffect } from "react";
import { useConstant } from "./useConstant";

export const createComponent = (creator) => {
  return (props) => {
    const [state, setState] = useState({});
    const unmounters = useRef([]);

    const render = useConstant(() => {
      const beforeUnmount = (unmounter) => {
        unmounters.current.push(unmounter);
      };
      return creator({ setState, beforeUnmount });
    });

    useEffect(() => {
      return () => {
        unmounters.current.forEach((unmounter) => {
          unmounter();
        });
      };
    }, []);

    return render(props, state);
  };
};
