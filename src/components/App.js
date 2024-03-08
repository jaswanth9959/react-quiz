import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinalScreen from "./FinalScreen";
import Timer from "./Timer";
import ques from "./questions";
function App() {
  const initialState = {
    questions: [],
    status: "",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    remainingSecs: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFetching":
        return { ...state, status: "loading" };
      case "start":
        return {
          ...state,
          status: "active",
          remainingSecs: state.questions.length * 30,
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "next":
        return { ...state, index: state.index + 1, answer: null };
      case "finished":
        return {
          ...state,
          status: "finished",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      case "tick":
        return {
          ...state,
          remainingSecs: state.remainingSecs - 1,
          status: state.remainingSecs === 0 ? "finished" : state.status,
        };
      case "reset":
        return {
          ...initialState,
          highScore: state.highScore,
          status: "ready",
          questions: state.questions,
        };
      default:
        return { ...state, questions: [], status: "error" };
    }
  };

  const [
    { questions, status, index, answer, points, highScore, remainingSecs },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "dataFetching" });
      // const data = await fetch("http://localhost:5000/questions");
      const res = ques;
      dispatch({ type: "dataReceived", payload: res });
    };

    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <Timer dispatch={dispatch} remainingSecs={remainingSecs} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinalScreen
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
