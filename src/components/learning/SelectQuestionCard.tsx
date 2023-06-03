import { Card, Typography } from "antd";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { handleSpeak } from "./handleSpeak";
import { toast } from "react-toastify";
import {
  pushWord,
  removeQuestion,
  swapQuestion,
} from "../../redux/features/caseStudySlice";

const SelectQuestionCard = () => {
  const { questions } = useAppSelector((state) => state.caseStudySlice);
  const { word, options, _type } = questions[0];
  const dispatch = useAppDispatch();
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
          Select the correct answer
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
        {_type === "select_meaning" ? word.word : word.meaning}
      </Typography.Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 27,
          width: "100%",
        }}
      >
        {options.map((e) => (
          <Card
            style={{
              cursor: "pointer",
              boxShadow: "0 0 0 1px #d9d9d9 inset",
              borderRadius: 2,
            }}
            onClick={() => {
              if (e.id === word.id) {
                toast.success("Correct answer");
                handleSpeak("Correct");
                dispatch(removeQuestion());
              } else {
                toast.error("Incorrect answer");
                handleSpeak("Incorrect");
                dispatch(pushWord(word));
                dispatch(swapQuestion());
              }
            }}
          >
            <Typography.Title level={4} style={{ textAlign: "center" }}>
              {_type === "select_meaning" ? e.meaning : e.word}
            </Typography.Title>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default SelectQuestionCard;
