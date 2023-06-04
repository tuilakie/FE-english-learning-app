import { useParams } from "react-router-dom";
import { useGetQuestionQuery } from "../../redux/api/wordApi";
import { Card, Spin } from "antd";
import FillOutQuizz from "./FillOutQuizz";
import SelectQuizz from "./SelectQuizz";
import { useAppSelector } from "../../redux/hook";
const Meta = Card.Meta;

const Quizzes = () => {
  const { courseId } = useParams() as { courseId: string };
  const { data, isLoading, isFetching, refetch } =
    useGetQuestionQuery(courseId);

  const score = useAppSelector((state) => state.quizSlice.score);

  return (
    <>
      <Card
        style={{
          width: "100%",
          textAlign: "center",
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 27,
        }}
      >
        <Meta title="Your score" description={`${score} points`} />
      </Card>

      {!data || isLoading || isFetching ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: 4,
          }}
        >
          <Spin /> Loading...
        </div>
      ) : data._type === "fill" ? (
        <FillOutQuizz questions={data} fetchNextQuestion={refetch} />
      ) : (
        <SelectQuizz questions={data} fetchNextQuestion={refetch} />
      )}
    </>
  );
};

export default Quizzes;
