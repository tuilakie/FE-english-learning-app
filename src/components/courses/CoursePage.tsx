import { useCourseQuery } from "../../redux/api/courseApi";
import { Link, Outlet, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Space, Card, Avatar, Progress } from "antd";
import { blue } from "@ant-design/colors";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addBreadcrumbs } from "../../redux/features/breadcrumbSlice";
import { useEffect } from "react";

const { Meta } = Card;

const CoursePage = () => {
  const params = useParams();
  const { courseId } = params as { courseId: string };
  const dispatch = useAppDispatch();
  const breadcrumbs = useAppSelector(
    (state) => state.breadcrumbState.breadcrumbs
  );

  const {
    data: courseData,
    isLoading: courseLoading,
    isFetching: courseFetching,
  } = useCourseQuery(courseId);

  useEffect(() => {
    const breadcrumb = [
      {
        title: "Courses",
        path: "/",
      },
      {
        title: courseData?.name,
      },
    ];
    dispatch(addBreadcrumbs(breadcrumb));
  }, [courseId, courseData?.name, dispatch]);

  const { progress, words } = courseData?._count || {};
  const isLoading = courseLoading;
  const isFetching = courseFetching;

  return (
    <>
      {isLoading && isFetching ? (
        <div>
          <LoadingOutlined /> Loading...
        </div>
      ) : (
        <>
          <Card>
            <Space
              direction="vertical"
              size="large"
              style={{
                width: "100%",
                padding: "0 15%",
                margin: "0 0 20px 0",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "8px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                items={breadcrumbs}
                itemRender={(route, _params, items) => {
                  const last = items.indexOf(route) === items.length - 1;
                  return last || !route.path ? (
                    <span>{route.title}</span>
                  ) : (
                    <Link to={route.path}>{route.title}</Link>
                  );
                }}
              ></Breadcrumb>
              <Meta
                avatar={
                  <Avatar
                    src="https://picsum.photos/200"
                    shape="square"
                    size={64}
                  />
                }
                title={courseData?.name}
                description={
                  <Progress
                    type="line"
                    percent={Number(
                      (words && progress
                        ? (progress / words) * 100
                        : 0
                      ).toFixed(2)
                    )}
                    strokeColor={{
                      from: blue[2],
                      to: blue[4],
                    }}
                    status="active"
                    trailColor="lightgray"
                  />
                }
              />
            </Space>
            <Layout
              style={{
                margin: "0 15%",
                padding: "24px",
                minHeight: "100vh",
                backgroundColor: "white",
              }}
            >
              <Outlet />
            </Layout>
          </Card>
        </>
      )}
    </>
  );
};

export default CoursePage;
