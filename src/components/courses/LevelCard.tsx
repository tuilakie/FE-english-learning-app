import { EditOutlined } from "@ant-design/icons";
import { Card, Progress, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Meta } = Card;

type Props = {
  id: string;
  name?: string;
  progress?: number;
  total?: number;
};

const LevelCard = (props: Props) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <Card
      headStyle={{ backgroundColor: "#f0f2f5" }}
      title={<Typography.Title level={5}>{props.name}</Typography.Title>}
      style={{
        width: 320,
        marginTop: 26,
        textAlign: "center",
        display: "inline-block",
        marginRight: 45,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
      actions={[
        <EditOutlined
          key="learning"
          onClick={() => {
            navigate(`/courses/${courseId}/levels/${props.id}`);
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
        title={
          <Typography.Title level={5}>
            {`${props.progress} / ${props.total} items`}
          </Typography.Title>
        }
        description={
          <Progress
            strokeColor={{
              from: "#108ee9",
              to: "#87d068",
            }}
            percent={Number(
              (props.total && props.progress
                ? (props.progress / props.total) * 100
                : 0
              ).toFixed(2)
            )}
          />
        }
      />
    </Card>
  );
};

export default LevelCard;
