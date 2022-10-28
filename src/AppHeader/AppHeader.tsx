import React, { useContext, useState } from "react";
import styles from "./appheader.module.css";
import { Menu, PageHeader, Modal } from "antd";
import { SearchBox } from "../SearchBox";
import { workSpaceContext } from "../context/workSpaceContext";
import { MenuInfo } from "rc-menu/lib/interface";
import { dbContext } from "../context/dbContext";

// TODO Block new button while search is active

const items = [
  { key: "new", label: "New" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

export function AppHeader() {
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { dbData } = useContext<any>(dbContext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setMessage("");
    setCurrentNote({ id: currentNote.id, delete: true });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const handleClick = (el: MenuInfo) => {
    if (el.key === "new") {
      setCurrentNote({ new: true, openedForEdit: false });
    }
    if (el.key === "edit" && currentNote.id) {
      setCurrentNote({ id: currentNote.id, new: false, openedForEdit: true });
    }
    if (el.key === "delete") {
      if (currentNote.id) {
        const content = dbData.filter(
          (record: any) => record.id.toString() === currentNote.id
        );
        if (content[0].content) {
          setMessage(content[0].content);
        }
        showModal();
      }
    }
  };
  return (
    <>
      <PageHeader
        className="site-page-header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          items={items}
          onClick={(el) => handleClick(el)}
          selectedKeys={[""]}
        />
        <SearchBox />
        <Modal
          title="a"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>ARE YOU SURE TO DELETE NOTE: {message}?</p>
        </Modal>
      </PageHeader>
    </>
  );
}
