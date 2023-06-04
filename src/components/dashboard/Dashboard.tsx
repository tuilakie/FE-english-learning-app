import { Space } from "antd";
import CourseCard from "./CourseCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useCoursesQuery } from "../../redux/api/courseApi";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hook";
import { setCourses } from "../../redux/features/quizzesSlice";

const Dashboard = () => {
  const { data, isLoading, isFetching, isError } = useCoursesQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCourses(data || []));
  }, [data, dispatch]);

  if (isError) return <div>error</div>;

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading || isFetching ? (
        <>
          <LoadingOutlined /> Loading...
        </>
      ) : (
        data?.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            total={course._count.words}
            progress={course._count.progress}
          />
        ))
      )}
    </Space>
  );
};

export default Dashboard;
