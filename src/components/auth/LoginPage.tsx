import { Button, Card, Form, Input, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";

export type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
    toast.promise(login(values).unwrap(), {
      pending: "Logging in...",
      success: {
        render: () => {
          navigate("/");
          return "Login success 👌";
        },
      },
      error: {
        render: (err: any) => {
          console.log(err);
          return `Login fail ${err?.data?.data?.message || ""} 😥`;
        },
      },
    });
  };

  return (
    <>
      <Card title="Login" headStyle={{ fontSize: "24px" }}>
        <Space
          direction="vertical"
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{ minWidth: "30vw" }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Link to="/register">Register now!</Link>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </>
  );
};

export default LoginPage;
