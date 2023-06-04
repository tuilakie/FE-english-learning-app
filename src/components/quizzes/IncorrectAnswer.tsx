import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { setIsStart, setScore } from "../../redux/features/quizzesSlice";
import { useAppDispatch } from "../../redux/hook";
const { confirm } = Modal;

type Props = {
  score: number;
  dispatch: ReturnType<typeof useAppDispatch>;
  fetchNextQuestion: () => void;
};

export const ShowConfirmIncorrect = ({
  score,
  dispatch,
  fetchNextQuestion,
}: Props) => {
  // const dispatch = useAppDispatch();
  // const { score } = useAppSelector((state) => state.quizSlice);
  confirm({
    title: "Oops! Incorrect answer",
    icon: <ExclamationCircleFilled />,
    content: `Your score is ${score}, try better next time!`,
    onOk() {
      dispatch(setScore(0));
      dispatch(setIsStart(false));
      fetchNextQuestion();
    },
    // remove the cancel button
    okCancel: false,
  });
};
