import { Button, Card, Typography } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleSpeak } from "../learning/handleSpeak";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Questions } from "../../redux/api/types";
import { ShowConfirmIncorrect } from "./IncorrectAnswer";
import { setScore } from "../../redux/features/quizzesSlice";

type Props = {
  questions: Questions;
  fetchNextQuestion: () => void;
};

const FillOutQuestionCard = ({ questions, fetchNextQuestion }: Props) => {
  const { word, options } = questions;
  const [keyOpt, setKeyOpt] = useState<{ id: number; value: string }[]>([]);
  const [answer, setAnswer] = useState<{ id: number; value: string }[]>([]);
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.quizSlice.score);

  useEffect(() => {
    setKeyOpt(options.map((e, i) => ({ id: i, value: e })));
    setAnswer([]);
  }, [options]);

  return (
    <Card
      title={
        <Typography.Title
          level={4}
          style={{
            textDecoration: "italic",
            color: "GrayText",
          }}
        >
          Fill out the blank into the sentence
        </Typography.Title>
      }
      bodyStyle={{
        minHeight: 450,
        display: "flex",
        flexDirection: "column",

        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography.Text
        style={{ fontWeight: 800, fontSize: 27, marginBottom: 27 }}
      >
        {word.meaning}
      </Typography.Text>

      <Card>
        {answer.map((e) => (
          <Typography.Text
            key={e.id}
            keyboard
            strong
            style={{
              marginRight: 4,
              fontSize: 24,
              color: "green",
              cursor: "pointer",
              minWidth: 120,
            }}
            onClick={() => {
              setKeyOpt((prev) => [...prev, e]);
              setAnswer((prev) => prev.filter((el) => el !== e));
            }}
          >
            {e.value}
          </Typography.Text>
        ))}{" "}
      </Card>
      <Card>
        {keyOpt.length !== 0 ? (
          keyOpt.map((e) => (
            <Typography.Text
              keyboard
              strong
              style={{ marginRight: 4, fontSize: 24, cursor: "pointer" }}
              onClick={() => {
                setAnswer((prev) => [...prev, e]);
                setKeyOpt((prev) => prev.filter((el) => el !== e));
              }}
            >
              {e.value}
            </Typography.Text>
          ))
        ) : (
          <Button
            type="primary"
            onClick={() => {
              const checkAnswer = answer.reduce(
                (acc, cur) => acc + cur.value,
                ""
              );
              if (checkAnswer === word.word) {
                toast.success("Correct answer");
                handleSpeak(word.word);
                dispatch(setScore(score + 10));
                fetchNextQuestion();
              } else {
                handleSpeak("incorrect");
                ShowConfirmIncorrect({ score, dispatch, fetchNextQuestion });
              }
            }}
          >
            Submit
          </Button>
        )}
      </Card>
    </Card>
  );
};

export default FillOutQuestionCard;
