import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "incCount":
      return { ...state, count: state.count + state.step };
    case "decCount":
      return { ...state, count: state.count - state.step };
    case "setcount":
      return { ...state, count: action.payload };
    case "setstep":
      return { ...state, step: action.payload };
    case "reset":
      return { ...state, count: 0, step: 1 };
    default:
      return {};
  }
};

function DateCounter() {
  const initialState = { step: 1, count: 0 };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decCount" });
  };

  const inc = function () {
    dispatch({ type: "incCount" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setcount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setstep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
