import { Layout, Menu } from "antd";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./sidebar.module.css";
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
  const [currentActive, setCurrentActive] = useState<string>("");
  const [noFirstLoad, setNoFirstLoad] = useState<boolean>(false);

  if (dbData) {
    dbData.sort((a: any, b: any) => {
      if (a.change_date > b.change_date) {
        return -1;
      }
      if (a.change_date < b.change_date) {
        return 1;
      }
      return 0;
    });
    items = dbData.map((record: any) => ({
      key: record.id,
      label: record.content, //, <div className={styles.test}>{record.content}1</div>
    }));
  }

  /* useEffect(() => {
    if (items && items.length > 0 && !noFirstLoad) {
      setNoFirstLoad(true);
      let tempArr = [] as Array<any>;
      if (dbData.length === 1) {
        setCurrentNote({
          id: dbData[0].id.toString(),
          openedForEdit: currentNote.openedForEdit,
        });
        setCurrentActive(dbData[0].id.toString());
      } else {
        for (const i of dbData) {
          tempArr.push(i?.id);
        }
        if (tempArr && tempArr.length !== 0) {
          const active = Math.max.apply(null, tempArr).toString();

          setCurrentNote({ id: active });
          setCurrentActive(active);
        }
      }
    }
  });*/
  useEffect(() => {
    setCurrentActive(currentNote.id);
  }, [currentNote.id]);

  const handleClick = (el: MenuInfo) => {
    setCurrentNote({ id: el.key });
    setCurrentActive(el.key);
  };

  return (
    <div>
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
          selectedKeys={[currentActive]}
          items={items}
          onClick={(el) => handleClick(el)}
        />
      </Sider>
    </div>
  );
}
