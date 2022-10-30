import { Layout, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./sidebar.module.css";

import type { MenuProps } from "antd";
import { dbContext } from "../context/dbContext";
import { workSpaceContext } from "../context/workSpaceContext";
import { MenuInfo } from "rc-menu/lib/interface";
import { marked } from "marked";

import DOMPurify from "dompurify";

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

  function prepareRecord(record: any) {
    const title = record.content.split("\n")[0];
    const cont = record.content.split("\n").slice(1).join(" ");
    return (
      <div className={styles.noteItem}>
        <div
          className={styles.noteItemHeader}
          dangerouslySetInnerHTML={createMarkUp(
            DOMPurify.sanitize(marked.parse(title), {
              ALLOWED_TAGS: [
                "b",
                "p",
                "strong",
                "em",
                "i",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "span",
              ],
            })
          )}
        ></div>
        <div className={styles.noteItemContent}>
          <div className={styles.noteDate}>{parseDate(record.change_date)}</div>
          <p>&nbsp;</p>
          <div
            className={styles.noteContent}
            dangerouslySetInnerHTML={createMarkUp(
              DOMPurify.sanitize(marked.parse(cont), {
                ALLOWED_TAGS: [
                  "b",
                  "p",
                  "strong",
                  "em",
                  "i",
                  "h1",
                  "h2",
                  "h3",
                  "h4",
                  "h5",
                  "h6",
                  "span",
                ],
              })
            )}
          />
        </div>
      </div>
    );
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
      label: prepareRecord(record),
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
