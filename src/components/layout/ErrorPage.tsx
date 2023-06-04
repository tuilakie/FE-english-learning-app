import { Layout, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Card
        bordered={false}
        style={{
          boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
          borderRadius: "10px",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Oops! </h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>Please try again later</p>
        </div>
        <Button
          type="primary"
          shape="round"
          style={{ width: 200, alignSelf: "center" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Dashboard
        </Button>
      </Card>
    </Layout>
  );
};

export default ErrorPage;
