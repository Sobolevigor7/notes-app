import React, { useState } from "react";

/*export interface IUserContextData {
  name?: string;
  iconImg?: string;
}*/

export const dbContext = React.createContext({});

export function DbContextProvider({ children }: { children: React.ReactNode }) {
  const [dbData, setDbData] = useState([]);

  return (
    <dbContext.Provider value={{ dbData, setDbData }}>
      {children}
    </dbContext.Provider>
  );
}
