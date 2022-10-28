import React, { useEffect } from "react";
import { db } from "./db";
import { notesContext } from "./context/notesContext";
import { useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { dbContext } from "./context/dbContext";
import { workSpaceContext } from "./context/workSpaceContext";
import { searchContext } from "./context/searchContext";

export function DbHandler() {
  const { data, setData } = useContext<any>(notesContext);
  const { dbData, setDbData } = useContext<any>(dbContext);
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const { searchString } = useContext<any>(searchContext);

  async function addNote() {
    try {
      const newId = await db.notes.add({
        change_date: Date.now(),
        content: "**NEW NOTE**",
      });
      setCurrentNote({
        id: newId.toString(),
        new: false,
        openedForEdit: true,
        delete: false,
      });
      //setData("**NEW NOTE **");
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
    if (currentNote.id) {
      try {
        await db.notes.update(parseInt(currentNote.id, 10), {
          content: data,
          //change_date: Date.now(),
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function updateNoteEditTime() {
    if (currentNote.id) {
      try {
        await db.notes.update(parseInt(currentNote.id, 10), {
          content: data,
          change_date: Date.now(),
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    updateNote();
  }, [data]);

  useEffect(() => {
    if (currentNote.delete) {
      if (currentNote.id !== "" && currentNote.id) {
        deleteNote();
      }
    }
    if (currentNote.new) {
      addNote();
    }
    if (currentNote.touched) {
      updateNoteEditTime();
    }
  }, [currentNote]);

  const dataBase = useLiveQuery(() => db.notes.toArray());

  const result = dataBase?.filter((elem) =>
    elem?.content
      ?.toLowerCase()
      .includes(searchString.toString().toLowerCase().trim())
  );

  useEffect(() => {
    if (searchString.length > 0) setCurrentNote.id = null;
    setDbData(result);
  }, [dataBase, searchString]);

  return <></>;
}
