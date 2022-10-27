import { Layout, Menu } from "antd";
import React, { useContext, useEffect } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { dbContext } from "../context/dbContext";
import { workSpaceContext } from "../context/workSpaceContext";
import { MenuInfo } from "rc-menu/lib/interface";

const { Sider } = Layout;

/*const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));*/
export function SideBar() {
  let items: MenuProps["items"] = [];
  const { dbData } = useContext<any>(dbContext);
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);

  console.log("dbData", dbData);
  if (dbData) {
    items = dbData.map((record: any) => ({
      key: record.id,
      label: record.title + record.content,
    }));
  }
  useEffect(() => {
    if (items) {
      setCurrentNote({ id: "1", new: false, openedForEdit: false });
    }
  }, []);

  const handleClick = (el: MenuInfo) => {
    setCurrentNote({ id: el.key });
  };

  return (
    <Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 100,
        bottom: 0,
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={(el) => handleClick(el)}
      />
    </Sider>
  );
}
