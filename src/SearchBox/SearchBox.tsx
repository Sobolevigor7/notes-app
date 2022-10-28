import React, { ChangeEvent, useContext, useState } from "react";
import styles from "./searchbox.module.css";
import { searchContext } from "../context/searchContext";
import { workSpaceContext } from "../context/workSpaceContext";

export function SearchBox() {
  const [value, changeValue] = useState("");
  const { setSearchString } = useContext<any>(searchContext);
  const { setCurrentNote } = useContext<any>(workSpaceContext);

  const handleChange = (el: ChangeEvent<HTMLInputElement>) => {
    const mask = /^[А-Я а-я ёЁ a-z A-Z]+$/;
    //if (!mask.exec(el.target.value)) return;
    changeValue(el.target.value);
    setSearchString(el.target.value);
    setCurrentNote({ id: null });
  };
  return (
    <span>
      <span>SearchBox</span>
      <input type="text" value={value} onChange={(el) => handleChange(el)} />
    </span>
  );
}
