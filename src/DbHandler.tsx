import React, { useEffect } from "react";
import { db } from "./db";
import { notesContext } from "./context/notesContext";
import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { dbContext } from "./context/dbContext";
import { workSpaceContext } from "./context/workSpaceContext";

export function DbHandler() {
  const { data, setData } = useContext<any>(notesContext);
  const { dbData, setDbData } = useContext<any>(dbContext);
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);

  async function addNote() {
    try {
      const newId = await db.notes.add({
        title: "title",
        change_date: Date.now(),
        content: "",
      });
      setCurrentNote({
        id: newId.toString(),
        new: false,
        openedForEdit: true,
        delete: false,
      });
      setDbData(dataBase);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote() {
    try {
      await db.notes.delete(parseInt(currentNote.id, 10));
      setCurrentNote({ id: null });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateNote() {
    try {
      await db.notes.update(parseInt(currentNote.id, 10), {
        content: data,
        change_date: Date.now(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (currentNote.openedForEdit) {
      updateNote();
    }
    if (currentNote.delete) {
      deleteNote();
    }
    if (currentNote.new) {
      addNote();
    }
  }, [currentNote]);

  const dataBase = useLiveQuery(() => db.notes.toArray());
  useEffect(() => {
    setDbData(dataBase);
  }, [dataBase]);

  return <></>;
}
