import { useCourseQuery } from "../../redux/api/courseApi";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const CoursePage = () => {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const { data, isLoading, isFetching } = useCourseQuery(courseId);

  return (
    <>
      {isLoading && isFetching ? (
        <div>
          <LoadingOutlined /> Loading...
        </div>
      ) : (
        <div>
          <h1>{JSON.stringify(data)}</h1>
        </div>
      )}
    </>
  );
};

export default CoursePage;
