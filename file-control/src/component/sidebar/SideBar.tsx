import React, { useState } from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Layout, Menu } from "antd";
import { history } from "../../configureStore/ConfigureStore";
const { Sider } = Layout;
const { SubMenu } = Menu;
export const navigationMenuData: MainMenuData[] = [
  {
    iconType: "video-camera",
    title: "fileUpload",
    key: "/",
  },
  {
    iconType: "video-camera",
    title: "chatroom",
    key: "/chatroom",
  },
];

type SideBarProps = {
  defaultSelected: Array<string>;
  defaultOpened: Array<string>;
  mainMenuData: Array<MainMenuData>;
};
type MainMenuData = {
  item?: Array<SubMenuData>;
  iconType: string;
  title: string;
  key: string;
  url?: string;
};
type SubMenuData = {
  key: string;
  title: string;
};

const renderMenuWithoutSubMenu = (menu: MainMenuData) => {
  return (
    <Menu.Item key={menu.key}>
      <LegacyIcon type={menu.iconType} />
      <span>{menu.title}</span>
    </Menu.Item>
  );
};

const renderMenuWithSubMenu = (menu: MainMenuData) => {
  return (
    <SubMenu
      key={menu.key}
      title={
        <span>
          <LegacyIcon type={menu.iconType} />
          {menu.title}
        </span>
      }
    >
      {menu.item?.map((sub: SubMenuData) => (
        <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
      ))}
    </SubMenu>
  );
};


const SideBar = (props: SideBarProps ) => {
  const [trigger, setTrigger] = useState<string | null>(null);

  const { defaultSelected, defaultOpened, mainMenuData } = props;

  const renderItem = (data: MainMenuData) => {
    return data.item
      ? renderMenuWithSubMenu(data)
      : renderMenuWithoutSubMenu(data);
  };

  return (
    <Sider
      width={trigger === null ? "20vw" : "40vw"}
      style={{
        height: "calc(100vh - 64px)",
        left: 0,
        background: "#fff",
      }}
      breakpoint="lg"
      collapsible
      onBreakpoint={(isLowerBreakpoint) => {
        setTrigger(isLowerBreakpoint ? "1" : null);
      }}
      collapsedWidth={0}
      trigger={trigger}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={defaultSelected}
        defaultOpenKeys={defaultOpened}
        style={{ height: "100%", borderRight: 0 }}
        onClick={(props) => {
          history.push({ pathname: props.key });
        }}
        theme="dark"
      >
        {mainMenuData.map((main) => renderItem(main))}
      </Menu>
    </Sider>
  );
};
SideBar.defaultProps = {
  defaultSelected: ["/"],
  defaultOpened: ["/"],
  mainMenuData: navigationMenuData,
};
export default SideBar;
