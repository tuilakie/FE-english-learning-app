import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  QuestionOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
import type { MenuProps } from "antd";
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import UserMenu from "./UserMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const items: MenuProps["items"] = [
  {
    key: "/",
    label: <NavLink to="/">Dashboard</NavLink>,
    icon: <HomeOutlined />,
  },
  {
    key: "quizzes",
    label: <NavLink to="/quizzes">Quizzes</NavLink>,
    icon: <QuestionOutlined />,
  },
  {
    key: "profile",
    label: <NavLink to="/profile">Profile</NavLink>,
    icon: <UserOutlined />,
  },
];

export const AuthLayout = () => {
  const [current, setCurrent] = useState("/");
  const location = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <UserMenu />
        </Header>
      )}
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: "100vh" }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{ textAlign: "center", fontSize: "16px", fontWeight: 600 }}
      >
        English Learning App©2023 Created by{" "}
        <a
          style={{
            color: "#1890ff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          href="https://www.github.com/tuilakie"
        >
          .tuilakie
        </a>
      </Footer>
    </Layout>
  );
};
