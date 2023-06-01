import { Avatar, Dropdown, Space, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLogoutUserMutation, useWhoamiQuery } from "../../redux/api/authApi";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "logout",
    icon: <LogoutOutlined />,
  },
];

const UserMenu = () => {
  const [logout] = useLogoutUserMutation();
  const { data: user, isLoading, isFetching } = useWhoamiQuery();
  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    if (e.key === "1") {
      message.info("Logging out...");
      await logout().unwrap();
      window.location.reload();
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <span style={{ marginRight: "18px" }}>
            {isLoading || isFetching ? <LoadingOutlined /> : user?.name}
          </span>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </Space>
      </Dropdown>
    </>
  );
};

export default UserMenu;
