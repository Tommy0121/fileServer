import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { history } from "../../configureStore/ConfigureStore";

export const navigationMenuData: MainMenuData[] = [
  {
    iconType: "video-camera",
    title: "fileUpload",
    key: "/",
    url: "/",
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

const SideBar = (props: SideBarProps) => {
  const [trigger, setTrigger] = useState<string | null>(null);
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const { defaultSelected, defaultOpened, mainMenuData } = props;

  const renderItem = (item: MainMenuData) => {
    if (item.item === undefined && item.url) {
      return (
        <Menu.Item key={item.key}>
          <Icon type={item.iconType} />
          <span>{item.title}</span>
        </Menu.Item>
      );
    } else {
      const temp = item as any;
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.iconType} />
              {item.title}
            </span>
          }
        >
          {temp.item.map((sub: SubMenuData) => (
            <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
          ))}
        </SubMenu>
      );
    }
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
        {mainMenuData.map((main) => (
          renderItem(main)
        ))}
      </Menu>
    </Sider>
  );
};

SideBar.defaultProps = {
  defaultSelected: ["/"],
  defaultOpened: ["demoRoom"],
  mainMenuData: navigationMenuData,
};

export default SideBar;
