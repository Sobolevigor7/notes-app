import "easymde/dist/easymde.min.css";
import styles from "./editor.module.css";
import SimpleMdeReact, {
  SimpleMdeToCodemirrorEvents,
} from "react-simplemde-editor";
import { useContext, useEffect, useMemo, useState } from "react";
import SimpleMDE from "easymde";
import { marked } from "marked";
import React from "react";
import { notesContext } from "../context/notesContext";
import { workSpaceContext } from "../context/workSpaceContext";
import { dbContext } from "../context/dbContext";

let counter = 1;
export const State = (props: any) => {
  return (
    <div style={{ margin: "8px" }}>
      <code data-testid="state">{JSON.stringify(props, null, 2)}</code>
    </div>
  );
};

export const Editor = () => {
  const [touched, setTouched] = useState(false);
  const { setData } = useContext<any>(notesContext);

  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const { dbData, setDbData } = useContext<any>(dbContext);

  const [value, setValue] = useState("");
  const events = {
    focus: () => console.log("focus"),
    blur: () => {
      {
        if (value.length === 0) {
          setCurrentNote({
            //Если руками стерли заметку - ставим на удаление
            id: currentNote.id,
            openedForEdit: false,
            new: false,
            delete: true,
          });
        } else {
          setCurrentNote({
            id: currentNote.id,
            openedForEdit: false,
            new: false,
          });
        }
      }
    },
  } as SimpleMdeToCodemirrorEvents;

  const changeValueFromDb = () => {
    if (currentNote.id && dbData) {
      const note = dbData.filter(
        (elem: any) => elem.id.toString() === currentNote.id
      );

      if (note[0]) {
        setValue(note[0].content);
        setData(note[0].content);
        console.log(note[0].content);
      }
    }
  };

  useEffect(() => {
    changeValueFromDb();
  }, [currentNote, dbData]);

  const onChange = () => {
    changeValueFromDb();
    if (!touched) {
      setTouched(true);
      setCurrentNote({
        id: currentNote.id,
        new: currentNote.new,
        openedForEdit: currentNote.openedForEdit,
        touched: true,
      });
    }
  };

  const handleTextChangeByButton = () => {
    setValue(`Changing text by setting new state. ${counter++}`);
  };
  // TODO Change aligment of editor
  // TODO Parsing check
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      forceSync: true,
      lineWrapping: true,
      status: false,
    } as SimpleMDE.Options;
  }, []);

  return (
    <div>
      <h4>Autofocus spellchecker disabled, button updated, controlled</h4>
      <button
        style={{ display: "inline-block", margin: "10px 0" }}
        onClick={handleTextChangeByButton}
      >
        Click me to update the textValue outside of the editor
      </button>
      <State value={value} />
      <h4>Update by button</h4>

      <p>`# Marked in browser\n\nRendered by **marked**.`</p>
      <SimpleMdeReact
        className={styles.editorContainer}
        options={autofocusNoSpellcheckerOptions}
        value={value}
        onChange={onChange}
        events={events}
      />
    </div>
  );
};
