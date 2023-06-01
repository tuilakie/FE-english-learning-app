import { Space } from "antd";
import CourseCard from "./CourseCard";
import { LoadingOutlined } from "@ant-design/icons";
import { useCoursesQuery } from "../../redux/api/courseApi";

const Dashboard = () => {
  const { data, isLoading, isFetching, isError } = useCoursesQuery();

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
