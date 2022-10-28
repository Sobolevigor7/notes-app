import React from "react";
//import "antd/dist/antd.css";

import styles from "./App.module.css";
import { SideBar } from "./SideBar";
import { Layout } from "antd";
import { WorkSpace } from "./WorkSpace";
import { AppHeader } from "./AppHeader";
import { NotesContextProvider } from "./context/notesContext";
import { DbContextProvider } from "./context/dbContext";
import { DbHandler } from "./DbHandler";
import { WorkSpaceContextProvider } from "./context/workSpaceContext";
import { SearchContextProvider } from "./context/searchContext";

// TODO types

function App() {
  return (
    <div className={styles.App}>
      <DbContextProvider>
        <WorkSpaceContextProvider>
          <SearchContextProvider>
            <Layout>
              <AppHeader />
            </Layout>
            <Layout hasSider>
              <SideBar />
            </Layout>
            <Layout className="site-layout">
              <NotesContextProvider>
                <WorkSpace />
                <DbHandler />
              </NotesContextProvider>
            </Layout>
          </SearchContextProvider>
        </WorkSpaceContextProvider>
      </DbContextProvider>
    </div>
  );
}

export default App;
