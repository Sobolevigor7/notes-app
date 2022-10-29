import React, { useContext, useEffect, useState } from "react";
import styles from "./appheader.module.css";
import { Modal, Tooltip, Button } from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { SearchBox } from "../SearchBox";
import { workSpaceContext } from "../context/workSpaceContext";

import { dbContext } from "../context/dbContext";
import { searchContext } from "../context/searchContext";

export function AppHeader() {
  const { currentNote, setCurrentNote } = useContext<any>(workSpaceContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { dbData } = useContext<any>(dbContext);
  const { searchString } = useContext<any>(searchContext);
  const [disableNewButton, setDisableNewButton] = useState(false);

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

  const handleNewNote = () => {
    setCurrentNote({ new: true, openedForEdit: false });
  };
  const handleEditNote = () => {
    if (currentNote.id) {
      setCurrentNote({ id: currentNote.id, new: false, openedForEdit: true });
    }
  };

  const handleDeleteNote = () => {
    if (currentNote.id) {
      const content = dbData.filter(
        (record: any) => record.id.toString() === currentNote.id
      );
      if (content[0].content) {
        setMessage(content[0].content);
      }
      showModal();
    }
  };

  useEffect(() => {
    if (searchString && searchString.length > 0) {
      setDisableNewButton(true);
    } else {
      setDisableNewButton(false);
    }
  }, [searchString]);
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.buttonGroup}>
          <Tooltip title="New note">
            <Button
              className={styles.btn}
              disabled={disableNewButton}
              icon={<FormOutlined />}
              shape="circle"
              onClick={handleNewNote}
            ></Button>
          </Tooltip>
          <Tooltip title="Edit note">
            <Button
              className={styles.btn}
              icon={<EditOutlined />}
              shape="circle"
              onClick={handleEditNote}
            ></Button>
          </Tooltip>
          <Tooltip title="Delete note">
            <Button
              className={styles.btn}
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={handleDeleteNote}
            ></Button>
          </Tooltip>
        </div>
        <SearchBox />
        <Modal
          title="Confirm the action"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>ARE YOU SURE TO DELETE NOTE: {message}?</p>
        </Modal>
      </div>
    </div>
  );
}
