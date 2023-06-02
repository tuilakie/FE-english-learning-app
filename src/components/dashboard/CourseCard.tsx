import { Card, Progress, Space, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Meta } = Card;
import { useNavigate } from "react-router-dom";
import { blue } from "@ant-design/colors";

type Props = {
  id: string;
  name?: string;
  progress?: number;
  total?: number;
};

const CourseCard = ({ id, name, progress, total }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: 600 }}
      actions={[
        <EditOutlined
          title="Start learning"
          key="learning"
          onClick={() => {
            navigate(`/courses/${id}`);
          }}
        />,
      ]}
      cover={
        <img
          alt="example"
          src="https://picsum.photos/200/50"
          style={{
            padding: "5px",
            objectFit: "cover",
          }}
        />
      }
    >
      <Meta
        title={<Typography.Title level={3}>{name}</Typography.Title>}
        description={
          <Space
            direction="vertical"
            size="large"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title
              level={4}
              // strong

              type="secondary"
            >
              {" "}
              {progress ? `${progress} / ${total} items` : "Not started"}
            </Typography.Title>

            <Progress
              size={[500, 20]}
              percent={Number(
                (total && progress ? (progress / total) * 100 : 0).toFixed(2)
              )}
              strokeColor={{
                from: blue[2],
                to: blue[4],
              }}
              status="active"
              trailColor="lightgray"
            />
          </Space>
        }
      />
    </Card>
  );
};

export default CourseCard;
