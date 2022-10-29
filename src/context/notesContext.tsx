import React, { useState } from "react";

export const notesContext = React.createContext({});

export function NotesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState("");

  return (
    <notesContext.Provider value={{ data, setData }}>
      {children}
    </notesContext.Provider>
  );
}
