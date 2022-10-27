import React, { useContext, useEffect, useState } from "react";
import styles from "./workspace.module.css";
import { Layout } from "antd";
import { Editor } from "../Editor";
import { notesContext } from "../context/notesContext";
import { db } from "../db";
import { workSpaceContext } from "../context/workSpaceContext";
import { dbContext } from "../context/dbContext";
const { Content } = Layout;

export function WorkSpace() {
  const { data, setData } = useContext<any>(notesContext);
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const { dbData, setDbData } = useContext<any>(dbContext);
  const [noteToDisplay, setNoteToDisplay] = useState("");
  const [noteEdit, setNoteToEdit] = useState(false);
  useEffect(() => {
    if (currentNote.id && dbData) {
      const note = dbData.filter(
        (elem: any) => elem.id.toString() === currentNote.id
      );
      if (note[0]) {
        setNoteToDisplay(note[0].title + note[0].content);
      }
    }
    if (!dbData || dbData.length === 0) {
      setNoteToDisplay("");
    }
  }, [currentNote, dbData]);

  const handleClick = () => {
    setCurrentNote({ id: currentNote.id, openedForEdit: true, new: false });
  };
  return (
    <Content style={{ margin: "100px 16px 0", overflow: "initial" }}>
      <div>NEW EDITOR</div>
      {noteToDisplay && !currentNote.openedForEdit && (
        <div onClick={handleClick}>{noteToDisplay} </div>
      )}
      {noteToDisplay && currentNote.openedForEdit && <Editor />}

      <div>NEW EDITOR END</div>
    </Content>
  );
}
