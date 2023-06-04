import Quizzes from "./Quizzes";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { setIsStart } from "../../redux/features/quizzesSlice";

const QuizzPage = () => {
  const isStart = useAppSelector((state) => state.quizSlice.isStart);
  const dispatch = useAppDispatch();
  return (
    <>
      {isStart ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Quizzes />
        </div>
      ) : (
        <Button
          type="primary"
          size="large"
          style={{ width: "100%" }}
          onClick={() => dispatch(setIsStart(true))}
        >
          Start Quizz Now !!!
        </Button>
      )}
    </>
  );
};

export default QuizzPage;
