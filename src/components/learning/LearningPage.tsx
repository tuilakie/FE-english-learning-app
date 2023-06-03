import { useNavigate, useParams } from "react-router-dom";
import { useCaseStudiesQuery } from "../../redux/api/wordApi";
import { Button, Progress } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import CaseStudies from "./CaseStudies";
import {
  setQuestions,
  setWords,
  setWordsLearned,
} from "../../redux/features/caseStudySlice";

const LearningPage = () => {
  const { courseId, levelId } = useParams() as {
    courseId: string;
    levelId: string;
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: caseStudiesData,
    isLoading: caseStudiesIsLoading,
    isFetching: caseStudiesFetching,
  } = useCaseStudiesQuery({ courseId, levelId });

  useEffect(() => {
    if (caseStudiesData) {
      dispatch(setWords(caseStudiesData.words));
      dispatch(setQuestions(caseStudiesData.questions));
      dispatch(setWordsLearned(caseStudiesData.words.map((word) => word.id)));
    }
  }, [caseStudiesData, dispatch]);

  const { questions } = useAppSelector((state) => state.caseStudySlice);

  if (caseStudiesIsLoading || caseStudiesFetching) return <div>Loading...</div>;
  if (caseStudiesData && caseStudiesData?.meta.take === 0)
    return (
      <>
        <h1>No case studies found for this level</h1>
        <h1>May be you already completed all case studies for this level</h1>
        <h1>Please try another level.</h1>
        <Button
          type="text"
          style={{ color: "red", textDecoration: "italic" }}
          onClick={() => {
            dispatch(setWords([]));
            dispatch(setQuestions([]));
            navigate(`/courses/${courseId}/levels/${levelId}`);
          }}
        >
          Go back
        </Button>
      </>
    );

  return (
    <>
      <Progress
        percent={
          caseStudiesData
            ? +Number(
                ((caseStudiesData.questions.length - questions.length) /
                  caseStudiesData.questions.length) *
                  100
              ).toFixed(2)
            : 0
        }
        strokeColor={{
          "0%": "#87d068",
          "100%": "#108ee9",
        }}
      />
      <CaseStudies />
    </>
  );
};

export default LearningPage;
