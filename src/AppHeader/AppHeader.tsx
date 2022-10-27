import React, { useContext } from "react";
import styles from "./appheader.module.css";
import { Menu, PageHeader } from "antd";
import { SearchBox } from "../SearchBox";
import { workSpaceContext } from "../context/workSpaceContext";
import { MenuInfo } from "rc-menu/lib/interface";

/*
items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
 */

const items = [
  { key: "new", label: "New" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

export function AppHeader() {
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const handleClick = (el: MenuInfo) => {
    if (el.key === "new") {
      setCurrentNote({ new: true, openedForEdit: false });
    }
    if (el.key === "edit") {
      setCurrentNote({ id: currentNote.id, new: false, openedForEdit: true });
    }
    if (el.key === "delete") {
      setCurrentNote({ id: currentNote.id, delete: true });
    }
  };
  return (
    <PageHeader
      className="site-page-header"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <Menu
        theme="light"
        mode="horizontal"
        items={items}
        onClick={(el) => handleClick(el)}
      />
      <SearchBox />
    </PageHeader>
  );
}
