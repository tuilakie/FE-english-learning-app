import { Button, Card, Form, Input, Space } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../../redux/api/authApi";

export type RegisterFormValues = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
};

const RegisterPage = () => {
  const [register] = useRegisterUserMutation();

  const onFinish = (values: RegisterFormValues) => {
    console.log("Success:", values);
    if (values.password !== values.confirm_password) {
      return toast.error("Password and password confirmation must be the same");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = values;
    toast.promise(register(rest).unwrap(), {
      pending: "Registering...",
      success: "Register success 👌",
      error: "Register failed 🤯",
    });
  };

  return (
    <>
      <Card title="Register" headStyle={{ fontSize: "24px" }}>
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
            name="normal_Register"
            className="Register-form"
            initialValues={{}}
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
                placeholder=" email"
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder=" username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password (6-20) character!",
                  min: 6,
                  max: 20,
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder=" password"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please confirm password match with your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder=" confirm-password"
              />
            </Form.Item>
            <Form.Item>
              <Link to="/login">Sign in now!</Link>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="Register-form-button"
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </>
  );
};

export default RegisterPage;
