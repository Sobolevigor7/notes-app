import { Layout, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./sidebar.module.css";

import type { MenuProps } from "antd";
import { dbContext } from "../context/dbContext";
import { workSpaceContext } from "../context/workSpaceContext";
import { MenuInfo } from "rc-menu/lib/interface";
import { marked } from "marked";

const { Sider } = Layout;

export function parseDate(date: number) {
  const newDateToParse = new Date(date);
  let newDate;
  if (newDateToParse.toDateString() === new Date(Date.now()).toDateString()) {
    newDate = newDateToParse.toTimeString().slice(0, 5);
  } else {
    newDate = newDateToParse.toLocaleDateString();
  }

  return <div>{newDate}</div>;
}

export function SideBar() {
  let items: MenuProps["items"] = [];
  const { dbData } = useContext<any>(dbContext);
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const [currentActive, setCurrentActive] = useState<string>("");
  function createMarkUp(note: any) {
    return { __html: note };
  }

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
      label: (
        <div className={styles.noteItem}>
          <div className={styles.noteDate}>{parseDate(record.change_date)}</div>
          <div
            className={styles.noteContent}
            dangerouslySetInnerHTML={createMarkUp(marked.parse(record.content))}
          />
        </div>
      ),
    }));
  }

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
          height: "90vh",
          position: "fixed",
          left: 0,
          top: 110,
          bottom: 0,
          borderTop: "1px solid rgba(76, 81, 88, 0.28)",
          paddingTop: "10px",
          zIndex: "2",
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
