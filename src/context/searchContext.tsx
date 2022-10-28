import React, { useState } from "react";

/*
export interface ISearchContext {
  searchString?: string;
}
*/
export const searchContext = React.createContext({});

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchString, setSearchString] = useState([]);

  return (
    <searchContext.Provider value={{ searchString, setSearchString }}>
      {children}
    </searchContext.Provider>
  );
}
