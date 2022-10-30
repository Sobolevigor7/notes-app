import "easymde/dist/easymde.min.css";
import styles from "./editor.module.css";
import SimpleMdeReact, {
  SimpleMdeToCodemirrorEvents,
} from "react-simplemde-editor";
import { useContext, useEffect, useMemo, useState } from "react";
import SimpleMDE from "easymde";

import React from "react";
import { notesContext } from "../context/notesContext";
import { workSpaceContext } from "../context/workSpaceContext";
import { dbContext } from "../context/dbContext";

export const Editor = () => {
  const [touched, setTouched] = useState(false);
  const { setData } = useContext<any>(notesContext);

  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const { dbData } = useContext<any>(dbContext);

  const [value, setValue] = useState("");
  const events = {
    focus: () => console.log("focus"),
    blur: () => {
      console.log("blur");
    },
  } as SimpleMdeToCodemirrorEvents;

  const changeValueFromDb = () => {
    if (!touched) {
      if (currentNote.id && dbData) {
        const note = dbData.filter(
          (elem: any) => elem.id.toString() === currentNote.id
        );

        if (note[0]) {
          setValue(note[0].content);
          setData(note[0].content);
        }
      }
    }
  };

  useEffect(() => {
    changeValueFromDb();
  }, [currentNote, dbData]);

  const onChange = (value: string) => {
    if (touched) {
      setValue(value);
      setData(value);
    }

    if (!touched) {
      changeValueFromDb();
      setTouched(true);

      setData(value);
      setCurrentNote({
        id: currentNote.id,
        new: currentNote.new,
        openedForEdit: currentNote.openedForEdit,
        touched: true,
      });
    }
  };

  const handleSaveButton = () => {
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
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      forceSync: true,
      lineWrapping: true,
      status: false,
      parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: true,
        underscoresBreakWords: false,
      },

      toolbarButtonClassPrefix: "note",
      minHeight: "500px",

      toolbar: [
        {
          name: "bold",
          action: SimpleMDE.toggleBold,
          className: "fa fa-bold",
          title: "Полужирный",
        },
        "|",

        {
          name: "Italic",
          action: SimpleMDE.toggleItalic,
          className: "fa fa-italic",
          title: "Курсив",
        },
        "|",

        {
          name: "Heading",
          action: SimpleMDE.toggleHeading2,
          className: "fa fa-header header-2",
          title: "Заголовок",
        },
        "|",

        {
          name: "undo",
          action: SimpleMDE.undo,
          className: "fa fa-undo",
          title: "Отменить",
        },
      ],
    } as SimpleMDE.Options;
  }, []);

  return (
    <div className={styles.editorContainer}>
      <SimpleMdeReact
        options={autofocusNoSpellcheckerOptions}
        value={value}
        onChange={onChange}
        events={events}
      />
      <button
        style={{ display: "inline-block", margin: "10px 0" }}
        onClick={handleSaveButton}
      >
        Save
      </button>
    </div>
  );
};
