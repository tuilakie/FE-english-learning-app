import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import WordCaseCard from "./WordCaseCard";
import { Button } from "antd";
import { removeWord, swapQuestion } from "../../redux/features/caseStudySlice";
import { toast } from "react-toastify";
import { handleSpeak } from "./handleSpeak";
import SelectQuestionCard from "./SelectQuestionCard";
import FillOutQuestionCard from "./FillOutQuestionCard";
import { useSaveProgressMutation } from "../../redux/api/wordApi";

const CaseStudies = () => {
  const navigate = useNavigate();
  const { courseId, levelId } = useParams() as {
    courseId: string;
    levelId: string;
  };
  const { words, questions, wordsLearned } = useAppSelector(
    (state) => state.caseStudySlice
  );
  const dispatch = useAppDispatch();
  const [saveProgress] = useSaveProgressMutation();

  const handleOnNextStep = () => {
    toast.success(words[0]?.word);
    handleSpeak(words[0]?.word);
    dispatch(removeWord());
  };

  const handleOnIDK = () => {
    if (questions[0]._type === "fill") {
      toast.info(questions[0].word.word);
      handleSpeak(questions[0].word.word);
    } else {
      const answers = questions[0].options.find(
        (option) => option.id === questions[0].word.id
      );
      if (questions[0]._type === "select_word") {
        toast.info(answers?.word);
        handleSpeak(answers?.word);
      }
      if (questions[0]._type === "select_meaning") {
        toast.info(answers?.meaning);
        handleSpeak(answers?.meaning);
      }
    }
    dispatch(swapQuestion());
  };

  return (
    <>
      <div style={{ marginBottom: 20, display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          {words[0] !== undefined ? (
            <WordCaseCard />
          ) : questions[0] !== undefined ? (
            questions[0]._type === "fill" ? (
              <FillOutQuestionCard />
            ) : (
              <SelectQuestionCard />
            )
          ) : (
            <>
              <h1>Completed</h1>
              <h2>Please click button to save your progress</h2>
              <Button
                type="primary"
                onClick={() => {
                  toast.promise(
                    saveProgress({ wordId: wordsLearned }).unwrap(),
                    {
                      pending: "Saving... 🚀",
                      success: "Saved successfully 🎉",
                      error: "Something went wrong 😢",
                    }
                  );
                }}
              >
                Save Progess
              </Button>
            </>
          )}
        </div>
        {questions.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{ height: "100%" }}
              onClick={() => {
                words[0] !== undefined ? handleOnNextStep() : handleOnIDK();
              }}
            >
              {words[0] !== undefined ? "Next step !" : "I don't know"}
            </Button>
            <Button
              type="primary"
              size="large"
              danger
              style={{ height: "10%" }}
              onClick={() => {
                navigate(`/courses/${courseId}/levels/${levelId}`);
              }}
            >
              Exit Learning
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CaseStudies;
