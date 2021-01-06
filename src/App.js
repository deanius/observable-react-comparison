import React from "react";
import { createComponent } from "./createComponent";
import { observable, derived, observe } from "./state";
import "./styles.css";

const App = createComponent(({ setState }) => {
  // This is a constructor layer that only runs once.
  // Create observables to hold our counter state.
  const countOne$ = observable(0);
  const countTwo$ = observable(0);
  const countTwoDoubled$ = derived(countTwo$, (countTwo) => {
    return countTwo * 2;
  });

  observe(
    [countOne$, countTwo$, countTwoDoubled$],
    (countOne, countTwo, countTwoDoubled) => {
      setState({
        countOne,
        countTwo,
        countTwoDoubled
      });
    }
  );

  // The constructor returns the render function.
  return (props, state) => (
    <div>
      <button
        onClick={() => {
          countOne$.set((prev) => prev + 1);
        }}
      >
        Increment Count One: {state.countOne}
      </button>
      <button
        onClick={() => {
          countTwo$.set((prev) => prev + 1);
        }}
      >
        Increment Count Two: {state.countTwo}
      </button>
      <p>Count Two Doubled: {state.countTwoDoubled}</p>
    </div>
  );
});

export default App;
