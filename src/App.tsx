import React from "react";

import styles from "./App.module.css";
import { SideBar } from "./SideBar";
import { WorkSpace } from "./WorkSpace";
import { AppHeader } from "./AppHeader";
import { NotesContextProvider } from "./context/notesContext";
import { DbContextProvider } from "./context/dbContext";
import { DbHandler } from "./DbHandler";
import { WorkSpaceContextProvider } from "./context/workSpaceContext";
import { SearchContextProvider } from "./context/searchContext";

function App() {
  return (
    <div className={styles.App}>
      <DbContextProvider>
        <WorkSpaceContextProvider>
          <SearchContextProvider>
            <AppHeader />
            <div className={styles.mainArea}>
              <SideBar />
              <NotesContextProvider>
                <WorkSpace />
                <DbHandler />
              </NotesContextProvider>
            </div>
          </SearchContextProvider>
        </WorkSpaceContextProvider>
      </DbContextProvider>
    </div>
  );
}

export default App;
