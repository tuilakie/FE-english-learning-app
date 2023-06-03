import { Button, Card, Input, Typography } from "antd";
import { Questions } from "../../redux/api/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleSpeak } from "./handleSpeak";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  pushQuestion,
  pushWord,
  removeQuestion,
  swapQuestion,
} from "../../redux/features/caseStudySlice";

const FillOutQuestionCard = () => {
  const { questions } = useAppSelector((state) => state.caseStudySlice);
  const { word, options } = questions[0];
  const [keyOpt, setKeyOpt] = useState<{ id: number; value: string }[]>([]);
  const [answer, setAnswer] = useState<{ id: number; value: string }[]>([]);
  const dispatch = useAppDispatch();

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
                dispatch(removeQuestion());
              } else {
                toast.error("incorrect answer");
                handleSpeak("incorrect");
                dispatch(pushWord(word));
                dispatch(swapQuestion());
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
