import React, { useState } from "react";

/*export interface IWorkSpaceContext {
  id?: string;
  new?: boolean;
  openedForEdit?: boolean;
  currentNote?: any;
  setCurrentNote?: Dispatch<SetStateAction<any>>;
}
*/
export const workSpaceContext = React.createContext({});

export function WorkSpaceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentNote, setCurrentNote] = useState({});

  return (
    <workSpaceContext.Provider value={{ currentNote, setCurrentNote }}>
      {children}
    </workSpaceContext.Provider>
  );
}
