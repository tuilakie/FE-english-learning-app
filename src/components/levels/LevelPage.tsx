import { Button, Card, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useGetLevelQuery } from "../../redux/api/levelApi";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";
import { addBreadcrumbs } from "../../redux/features/breadcrumbSlice";
import WordList from "./WordList";
const { Meta } = Card;
const LevelPage = () => {
  const { levelId, courseId } = useParams() as {
    courseId: string;
    levelId: string;
  };
  const {
    data: levelData,
    isLoading: levelLoading,
    isFetching: levelFetching,
  } = useGetLevelQuery({ courseId, levelId });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const breadcrumb = [
      {
        title: "Courses",
        path: "/",
      },
      {
        title: "Level",
        path: `/courses/${courseId}`,
      },
      {
        title: levelData?.name,
      },
    ];
    dispatch(addBreadcrumbs(breadcrumb));
  }, [dispatch, levelData?.name, courseId]);

  if (levelLoading || levelFetching)
    return (
      <div>
        <LoadingOutlined /> Loading...
      </div>
    );

  const progess = levelData?.words.filter((word) => word.learned).length;

  return (
    <>
      <Card bordered={false}>
        <Meta
          title={
            <Typography.Title level={3}>{levelData?.name}</Typography.Title>
          }
          description={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography.Title type="success" level={5}>
                {progess}/{levelData?._count?.words} words learned
              </Typography.Title>
              <Button type="primary">
                {`Learn ${
                  levelData?._count?.words && progess !== undefined
                    ? levelData?._count?.words - progess
                    : ""
                } words`}
              </Button>
            </div>
          }
        />
      </Card>

      <WordList data={levelData?.words || []} />
    </>
  );
};

export default LevelPage;
