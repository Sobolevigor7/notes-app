import React, { useContext, useEffect, useState } from "react";
import styles from "./workspace.module.css";
import { Layout } from "antd";
import { Editor } from "../Editor";

import { workSpaceContext } from "../context/workSpaceContext";
import { dbContext } from "../context/dbContext";

import { marked } from "marked";
import DOMPurify from "dompurify";

import { parseDate } from "../SideBar";

const { Content } = Layout;

export function WorkSpace() {
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const { dbData } = useContext<any>(dbContext);
  const [noteToDisplay, setNoteToDisplay] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState(<div></div>);

  useEffect(() => {
    if (currentNote.id && dbData) {
      const note = dbData.filter(
        (elem: any) => elem.id.toString() === currentNote.id
      );
      if (note[0]) {
        setDateToDisplay(parseDate(note[0].change_date));

        const value = DOMPurify.sanitize(marked.parse(note[0].content), {
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
        });

        setNoteToDisplay(value);
      }
    }
    if (!dbData || dbData.length === 0) {
      setNoteToDisplay("Please, add notes");
    } else if (!currentNote.id) {
      setNoteToDisplay("Please, select the note");
    }
  }, [currentNote, dbData]);
  function createMarkUp() {
    return { __html: noteToDisplay };
  }
  const handleClick = () => {
    if (currentNote.id) {
      setCurrentNote({ id: currentNote.id, openedForEdit: true, new: false });
    }
  };
  return (
    <Content className={styles.container}>
      {noteToDisplay && !currentNote.openedForEdit && (
        <div className={styles.previewArea} onClick={handleClick}>
          <div className={styles.previewHeader}>
            <div className={styles.dateToDisplay}>{dateToDisplay}</div>
            <p>Press to edit</p>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={createMarkUp()}
          />{" "}
        </div>
      )}
      {currentNote.openedForEdit && <Editor />}
    </Content>
  );
}
